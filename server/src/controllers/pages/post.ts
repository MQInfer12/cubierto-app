import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { ItemCarrito } from "../../interfaces/pages/post";
import { Venta } from "@prisma/client";

const app = Router();

app.post('/carrito/enviar/:idUsuario', async (req, res) => {
  const venta = await xprisma.venta.create({
    data: {
      usuarioId: req.params.idUsuario
    }
  });
  const data: ItemCarrito[] = req.body;
  await xprisma.detalleVenta.createMany({
    data: data.map(item => ({
      cantidad: item.cantidad,
      precioUnitario: item.productoActivo.precioDescontado,
      productoActivoId: item.productoActivo.id,
      ventaId: venta.id
    }))
  });
  const response: ApiResponse<Venta> = {
    message: "Se pidieron los productos correctamente",
    data: venta
  }
  res.json(response);
});

export default app;