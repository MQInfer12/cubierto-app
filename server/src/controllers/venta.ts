import { Router } from "express";
import xprisma from "../middlewares/queries";
import { ApiResponse } from "../interfaces/apiResponse";
import { Venta } from "@prisma/client";
import { CreateVentaInput, UpdateVentaInput } from "../interfaces/venta";

const app = Router();

app.get('/venta', async (req, res) => {
  const ventas = await xprisma.venta.findMany();
  const response: ApiResponse<Venta[]> = {
    message: "Ventas obtenidas correctamente",
    data: ventas
  }
  res.json(response);
});

app.get('/venta/:id', async (req, res) => {
  const venta = await xprisma.venta.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Venta> = {
    message: "Venta obtenida correctamente",
    data: venta
  };
  res.json(response);
});

app.post('/venta', async (req, res) => {
  const data: CreateVentaInput = req.body;
  const venta = await xprisma.venta.create({
    data: data
  });
  const response: ApiResponse<Venta> = {
    message: "Venta creada correctamente",
    data: venta
  };
  res.json(response);
});

app.put('/venta/:id', async (req, res) => {
  const data: UpdateVentaInput = req.body;
  const venta = await xprisma.venta.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<Venta> = {
    message: "Venta actualizada correctamente",
    data: venta
  }
  res.json(response);
});

app.delete('/venta/:id', async (req, res) => {
  const venta = await xprisma.venta.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Venta> = {
    message: "Venta eliminada correctamente",
    data: venta
  };
  res.json(response);
});

export default app;