import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { DetalleDonacion } from "@prisma/client";
import { CreateDetalleDonacionInput, UpdateDetalleDonacionInput } from "../../interfaces/models/detalleDonacion";

const app = Router();

app.get('/detalleDonacion', async (req, res) => {
  const detalleDonacions = await xprisma.detalleDonacion.findMany();
  const response: ApiResponse<DetalleDonacion[]> = {
    message: "Detalles de donaciones obtenidas correctamente",
    data: detalleDonacions
  }
  res.json(response);
});

app.get('/detalleDonacion/:id', async (req, res) => {
  const detalleDonacion = await xprisma.detalleDonacion.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<DetalleDonacion> = {
    message: "Detalle de donacion obtenida correctamente",
    data: detalleDonacion
  };
  res.json(response);
});

app.post('/detalleDonacion', async (req, res) => {
  const data: CreateDetalleDonacionInput = req.body;
  const detalleDonacion = await xprisma.detalleDonacion.create({
    data: data
  });
  const response: ApiResponse<DetalleDonacion> = {
    message: "Detalle de donacion creada correctamente",
    data: detalleDonacion
  };
  res.json(response);
});

app.put('/detalleDonacion/:id', async (req, res) => {
  const data: UpdateDetalleDonacionInput = req.body;
  const detalleDonacion = await xprisma.detalleDonacion.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<DetalleDonacion> = {
    message: "Detalle de donacion actualizada correctamente",
    data: detalleDonacion
  }
  res.json(response);
});

app.delete('/detalleDonacion/:id', async (req, res) => {
  const detalleDonacion = await xprisma.detalleDonacion.delete({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<DetalleDonacion> = {
    message: "Detalle de donacion eliminada correctamente",
    data: detalleDonacion
  };
  res.json(response);
});

export default app;