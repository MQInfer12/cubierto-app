import { Usuario } from "@prisma/client";
import { Router } from "express";
import pusher from "../../utilities/pusher";
import { ApiResponse } from "../../interfaces/apiResponse";

const app = Router();

interface Cola {
  updatedAt: Date
  personas: string[]
}

const cola: Cola = {
  updatedAt: new Date(),
  personas: []
};

app.put('/cola/beneficiario/entrar/:usuarioId', async (req, res) => {
  if(!cola.personas.includes(req.params.usuarioId)) {
    cola.personas.push(req.params.usuarioId);
    cola.updatedAt = new Date();
  }
  const response: ApiResponse<Cola> = {
    message: "Un usuario ingreso a la cola",
    data: cola
  }
  res.json(response);
});

app.put('/cola/beneficiario/salir/:usuarioId', async (req, res) => {
  cola.personas = cola.personas.filter(persona => persona !== req.params.usuarioId);
  cola.updatedAt = new Date();
  await pusher.trigger("cola-channel", "beneficiario", cola);
  const response: ApiResponse<Cola> = {
    message: "Un usuario salio de la cola",
    data: cola
  }
  res.json(response);
});

export default app;