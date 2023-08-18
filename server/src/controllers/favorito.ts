import { Router } from "express";
import xprisma from "../middlewares/queries";
import { ApiResponse } from "../interfaces/apiResponse";
import { Favorito } from "@prisma/client";
import { CreateFavoritoInput, UpdateFavoritoInput } from "../interfaces/favorito";

const app = Router();

app.get('/favorito', async (req, res) => {
  const favoritos = await xprisma.favorito.findMany();
  const response: ApiResponse<Favorito[]> = {
    message: "Favoritos obtenidos correctamente",
    data: favoritos
  }
  res.json(response);
});

app.get('/favorito/:id', async (req, res) => {
  const favorito = await xprisma.favorito.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Favorito> = {
    message: "Favorito obtenido correctamente",
    data: favorito
  };
  res.json(response);
});

app.post('/favorito', async (req, res) => {
  const data: CreateFavoritoInput = req.body;
  const favorito = await xprisma.favorito.create({
    data: data
  });
  const response: ApiResponse<Favorito> = {
    message: "Favorito creado correctamente",
    data: favorito
  };
  res.json(response);
});

app.put('/favorito/:id', async (req, res) => {
  const data: UpdateFavoritoInput = req.body;
  const favorito = await xprisma.favorito.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<Favorito> = {
    message: "Favorito actualizado correctamente",
    data: favorito
  }
  res.json(response);
});

app.delete('/favorito/:id', async (req, res) => {
  const favorito = await xprisma.favorito.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Favorito> = {
    message: "Favorito eliminado correctamente",
    data: favorito
  };
  res.json(response);
});

export default app;