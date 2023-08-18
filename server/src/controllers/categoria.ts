import { Router } from "express";
import xprisma from "../middlewares/queries";
import { ApiResponse } from "../interfaces/apiResponse";
import { Categoria } from "@prisma/client";
import { CreateCategoriaInput, UpdateCategoriaInput } from "../interfaces/categoria";

const app = Router();

app.get('/categoria', async (req, res) => {
  const categorias = await xprisma.categoria.findMany();
  const response: ApiResponse<Categoria[]> = {
    message: "Categorias obtenidas correctamente",
    data: categorias
  }
  res.json(response);
});

app.get('/categoria/:id', async (req, res) => {
  const categoria = await xprisma.categoria.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Categoria> = {
    message: "Categoria obtenida correctamente",
    data: categoria
  };
  res.json(response);
});

app.post('/categoria', async (req, res) => {
  const data: CreateCategoriaInput = req.body;
  const categoria = await xprisma.categoria.create({
    data: data
  });
  const response: ApiResponse<Categoria> = {
    message: "Categoria creada correctamente",
    data: categoria
  };
  res.json(response);
});

app.put('/categoria/:id', async (req, res) => {
  const data: UpdateCategoriaInput = req.body;
  const categoria = await xprisma.categoria.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<Categoria> = {
    message: "Categoria actualizada correctamente",
    data: categoria
  }
  res.json(response);
});

app.delete('/categoria/:id', async (req, res) => {
  const categoria = await xprisma.categoria.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Categoria> = {
    message: "Categoria eliminada correctamente",
    data: categoria
  };
  res.json(response);
});

export default app;