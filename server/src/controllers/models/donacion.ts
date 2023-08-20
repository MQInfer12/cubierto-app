import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { Donacion } from "@prisma/client";
import { CreateDonacionInput, UpdateDonacionInput } from "../../interfaces/models/donacion";

const app = Router();

app.get('/donacion', async (req, res) => {
  const donacions = await xprisma.donacion.findMany();
  const response: ApiResponse<Donacion[]> = {
    message: "Donaciones obtenidas correctamente",
    data: donacions
  }
  res.json(response);
});

app.get('/donacion/:id', async (req, res) => {
  const donacion = await xprisma.donacion.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Donacion> = {
    message: "Donacion obtenida correctamente",
    data: donacion
  };
  res.json(response);
});

app.post('/donacion', async (req, res) => {
  const data: CreateDonacionInput = req.body;
  const donacion = await xprisma.donacion.create({
    data: data
  });
  const response: ApiResponse<Donacion> = {
    message: "Donacion creada correctamente",
    data: donacion
  };
  res.json(response);
});

app.put('/donacion/:id', async (req, res) => {
  const data: UpdateDonacionInput = req.body;
  const donacion = await xprisma.donacion.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<Donacion> = {
    message: "Donacion actualizada correctamente",
    data: donacion
  }
  res.json(response);
});

app.delete('/donacion/:id', async (req, res) => {
  const donacion = await xprisma.donacion.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Donacion> = {
    message: "Donacion eliminada correctamente",
    data: donacion
  };
  res.json(response);
});

export default app;