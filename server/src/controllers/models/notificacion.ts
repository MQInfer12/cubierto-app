import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { Notificacion } from "@prisma/client";
import { CreateNotificacionInput, UpdateNotificacionInput } from "../../interfaces/models/notificacion";

const app = Router();

app.get('/notificacion', async (req, res) => {
  const notificacions = await xprisma.notificacion.findMany();
  const response: ApiResponse<Notificacion[]> = {
    message: "Notificaciones obtenidas correctamente",
    data: notificacions
  }
  res.json(response);
});

app.get('/notificacion/:id', async (req, res) => {
  const notificacion = await xprisma.notificacion.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Notificacion> = {
    message: "Notificacion obtenida correctamente",
    data: notificacion
  };
  res.json(response);
});

app.post('/notificacion', async (req, res) => {
  const data: CreateNotificacionInput = req.body;
  const notificacion = await xprisma.notificacion.create({
    data: data
  });
  const response: ApiResponse<Notificacion> = {
    message: "Notificacion creada correctamente",
    data: notificacion
  };
  res.json(response);
});

app.put('/notificacion/:id', async (req, res) => {
  const data: UpdateNotificacionInput = req.body;
  const notificacion = await xprisma.notificacion.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<Notificacion> = {
    message: "Notificacion actualizada correctamente",
    data: notificacion
  }
  res.json(response);
});

app.delete('/notificacion/:id', async (req, res) => {
  const notificacion = await xprisma.notificacion.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<Notificacion> = {
    message: "Notificacion eliminada correctamente",
    data: notificacion
  };
  res.json(response);
});

export default app;