import { Router } from "express";
import xprisma from "../middlewares/queries";
import { ApiResponse } from "../interfaces/apiResponse";
import { ProductoActivo } from "@prisma/client";
import { CreateProductoActivoInput, UpdateProductoActivoInput } from "../interfaces/productoActivo";

const app = Router();

app.get('/productoActivo', async (req, res) => {
  const productoActivos = await xprisma.productoActivo.findMany();
  const response: ApiResponse<ProductoActivo[]> = {
    message: "Productos Activos obtenidos correctamente",
    data: productoActivos
  }
  res.json(response);
});

app.get('/productoActivo/:id', async (req, res) => {
  const productoActivo = await xprisma.productoActivo.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo obtenido correctamente",
    data: productoActivo
  };
  res.json(response);
});

app.post('/productoActivo', async (req, res) => {
  const data: CreateProductoActivoInput = req.body;
  const productoActivo = await xprisma.productoActivo.create({
    data: data
  });
  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo creado correctamente",
    data: productoActivo
  };
  res.json(response);
});

app.put('/productoActivo/:id', async (req, res) => {
  const data: UpdateProductoActivoInput = req.body;
  const productoActivo = await xprisma.productoActivo.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo actualizado correctamente",
    data: productoActivo
  }
  res.json(response);
});

app.delete('/productoActivo/:id', async (req, res) => {
  const productoActivo = await xprisma.productoActivo.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo eliminado correctamente",
    data: productoActivo
  };
  res.json(response);
});

export default app;