import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { Ubicacion } from "@prisma/client";
import { CreateUbicacionInput, UpdateUbicacionInput } from "../../interfaces/models/ubicacion";

const app = Router();

app.get('/ubicacion', async (req, res) => {
  const ubicaciones = await xprisma.ubicacion.findMany();
  const response: ApiResponse<Ubicacion[]> = {
    message: "Ubicaciones obtenidas correctamente",
    data: ubicaciones
  }
  res.json(response);
});

app.get('/ubicacion/:id', async (req, res) => {
  const ubicacion = await xprisma.ubicacion.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Ubicacion> = {
    message: "Ubicacion obtenido correctamente",
    data: ubicacion
  };
  res.json(response);
});

app.post('/ubicacion', async (req, res) => {
  const data: CreateUbicacionInput = req.body;
  const ubicacion = await xprisma.ubicacion.create({
    data: data
  });
  const response: ApiResponse<Ubicacion> = {
    message: "Ubicacion creada correctamente",
    data: ubicacion
  };
  res.json(response);
});

app.put('/ubicacion/:id', async (req, res) => {
  const data: UpdateUbicacionInput = req.body;
  const ubicacion = await xprisma.ubicacion.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<Ubicacion> = {
    message: "Ubicacion actualizada correctamente",
    data: ubicacion
  }
  res.json(response);
});

app.delete('/ubicacion/:id', async (req, res) => {
  const ubicacion = await xprisma.ubicacion.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Ubicacion> = {
    message: "Ubicacion eliminada correctamente",
    data: ubicacion
  };
  res.json(response);
});

export default app;