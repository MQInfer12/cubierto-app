import { Usuario } from "@prisma/client";
import { Router } from "express";
import pusher from "../../utilities/pusher";
import { ApiResponse } from "../../interfaces/apiResponse";
import cron from 'node-cron';

const app = Router();

interface Cola {
  updatedAt: Date
  personas: string[]
}

const cola: Cola = {
  updatedAt: new Date(),
  personas: []
};

cron.schedule('*/1 * * * *', async () => {
  cola.personas.push("a");
});

app.put('/cola/beneficiario/entrar/:usuarioId', async (req, res) => {
  if(!cola.personas.includes(req.params.usuarioId)) {
    cola.personas.push(req.params.usuarioId);
  }
  if(cola.personas.length === 1) {
    cola.updatedAt = new Date();
  }
  const response: ApiResponse<Cola> = {
    message: "Un usuario ingreso a la cola",
    data: cola
  }
  res.json(response);
});

app.put('/cola/beneficiario/salir/:usuarioId', async (req, res) => {
  if(cola.personas[0] === req.params.usuarioId) {
    cola.updatedAt = new Date();
  }
  cola.personas = cola.personas.filter(persona => persona !== req.params.usuarioId);
  await pusher.trigger("cola-channel", "beneficiario", cola);
  const response: ApiResponse<Cola> = {
    message: `Un usuario salio de la cola`,
    data: cola
  }
  res.json(response);
});

app.get("/colabeneficiario", (req, res) => {
  res.json(cola);
})

export default app;