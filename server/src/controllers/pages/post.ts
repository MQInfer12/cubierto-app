import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { ItemCarrito } from "../../interfaces/pages/post";
import { Favorito, ProductoActivo, Venta } from "@prisma/client";
import { filterOfertas } from "../../utilities/filterOfertas";

const app = Router();

app.post('/carrito/enviar/:idUsuario', async (req, res) => {
  const data: ItemCarrito[] = req.body;
  const productosActivos: ProductoActivo[] = data.map(item => item.productoActivo);
  const activos = filterOfertas(productosActivos);

  if(productosActivos.length === activos.length) {
    const venta = await xprisma.venta.create({
      data: {
        usuarioId: req.params.idUsuario
      }
    });
  
    await xprisma.detalleVenta.createMany({
      data: data.map(item => ({
        cantidad: item.cantidad,
        precioUnitario: item.productoActivo.precioDescontado,
        productoActivoId: item.productoActivo.id,
        ventaId: venta.id
      }))
    });
    const ventaConDetalles = await xprisma.venta.findUnique({
      where: {
        id: venta.id
      },
      include: {
        detalles: {
          include: {
            productoActivo: {
              include: {
                producto: {
                  include: {
                    usuario: true
                  }
                }
              }
            }
          }
        }
      }
    });
    const response: ApiResponse<Venta> = {
      message: "Se pidieron los productos correctamente",
      data: ventaConDetalles
    }
    res.json(response);
  } else {
    const notActive = productosActivos.filter(pa => !activos.find(a => a.id === pa.id));
    const response: ApiResponse<ProductoActivo[]> = {
      message: "Alguno de las ofertas ya no esta disponible",
      data: notActive
    }
    res.json(response);
  }
});

interface LikeTo {
  restauranteId: string
  usuarioId: string
  favoritoId: number | null
}

app.put('/liketo', async (req, res) => {
  const data: LikeTo = req.body;
  let message: string;
  let favorito: Favorito;
  if(!data.favoritoId) {
    message = "Se añadio un favorito correctamente";
    favorito = await xprisma.favorito.create({
      data: {
        restauranteId: data.restauranteId,
        usuarioId: data.usuarioId
      }
    });
  } else {
    message = "Se quito un favorito correctamente";
    favorito = await xprisma.favorito.delete({
      where: {
        id: data.favoritoId
      }
    })
  }
  const response: ApiResponse<Favorito> = {
    message,
    data: favorito
  }
  res.json(response);
});

export default app;