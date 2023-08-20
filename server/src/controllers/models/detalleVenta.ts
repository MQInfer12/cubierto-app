import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { DetalleVenta } from "@prisma/client";
import { CreateDetalleVentaInput, UpdateDetalleVentaInput } from "../../interfaces/models/detalleVenta";

const app = Router();

app.get('/detalleVenta', async (req, res) => {
  const detalleVentas = await xprisma.detalleVenta.findMany();
  const response: ApiResponse<DetalleVenta[]> = {
    message: "Detalles de ventas obtenidas correctamente",
    data: detalleVentas
  }
  res.json(response);
});

app.get('/detalleVenta/:id', async (req, res) => {
  const detalleVenta = await xprisma.detalleVenta.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<DetalleVenta> = {
    message: "Detalle de venta obtenida correctamente",
    data: detalleVenta
  };
  res.json(response);
});

app.post('/detalleVenta', async (req, res) => {
  const data: CreateDetalleVentaInput = req.body;
  const detalleVenta = await xprisma.detalleVenta.create({
    data: data
  });
  const response: ApiResponse<DetalleVenta> = {
    message: "Detalle de venta creada correctamente",
    data: detalleVenta
  };
  res.json(response);
});

app.put('/detalleVenta/:id', async (req, res) => {
  const data: UpdateDetalleVentaInput = req.body;
  const detalleVenta = await xprisma.detalleVenta.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<DetalleVenta> = {
    message: "Detalle de venta actualizada correctamente",
    data: detalleVenta
  }
  res.json(response);
});

app.delete('/detalleVenta/:id', async (req, res) => {
  const detalleVenta = await xprisma.detalleVenta.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<DetalleVenta> = {
    message: "Detalle de venta eliminada correctamente",
    data: detalleVenta
  };
  res.json(response);
});

export default app;