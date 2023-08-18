import { Router } from "express";
import xprisma from "../middlewares/queries";
import { ApiResponse } from "../interfaces/apiResponse";
import { Producto } from "@prisma/client";
import { CreateProductoInput, UpdateProductoInput } from "../interfaces/producto";

const app = Router();

app.get('/producto', async (req, res) => {
  const productos = await xprisma.producto.findMany();
  const response: ApiResponse<Producto[]> = {
    message: "Productos obtenidos correctamente",
    data: productos
  }
  res.json(response);
});

app.get('/producto/:id', async (req, res) => {
  const producto = await xprisma.producto.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Producto> = {
    message: "Producto obtenido correctamente",
    data: producto
  };
  res.json(response);
});

app.post('/producto', async (req, res) => {
  const data: CreateProductoInput = req.body;
  const producto = await xprisma.producto.create({
    data: data
  });
  const response: ApiResponse<Producto> = {
    message: "Producto creado correctamente",
    data: producto
  };
  res.json(response);
});

app.put('/producto/:id', async (req, res) => {
  const data: UpdateProductoInput = req.body;
  const producto = await xprisma.producto.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<Producto> = {
    message: "Producto actualizado correctamente",
    data: producto
  }
  res.json(response);
});

app.delete('/producto/:id', async (req, res) => {
  const producto = await xprisma.producto.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Producto> = {
    message: "Producto eliminado correctamente",
    data: producto
  };
  res.json(response);
});

export default app;