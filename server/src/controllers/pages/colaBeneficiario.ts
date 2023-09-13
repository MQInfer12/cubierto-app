import { Router } from "express";
import pusher from "../../utilities/pusher";
import { ApiResponse } from "../../interfaces/apiResponse";
import { Cola, cola } from "../../utilities/colaBeneficiario";
import xprisma from "../../middlewares/queries";
import { Usuario } from "@prisma/client";

const app = Router();

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

app.delete('/cola/beneficiario/salir/:usuarioId', async (req, res) => {
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

app.put('/cola/beneficiario/expulsarprimero', async (req, res) => {
  if(!cola.personas.length) {
    return res.json({
      "message": "La cola está vacía"
    });
  }
  const ahora = new Date();
  const diff = ahora.getTime() - cola.updatedAt.getTime();
  const seconds = diff / 1000;
  const minutes = seconds / 60;
  if(minutes > 5) {
    cola.personas.shift();
    cola.updatedAt = new Date();
    await pusher.trigger("cola-channel", "beneficiario", cola);
    res.json({
      "message": `Se retiró al primer lugar de la cola después de ${Math.floor(minutes)} minutos`
    });
  } else {
    res.json({
      "message": `El primer lugar de la cola aún tiene ${5 - Math.floor(minutes)} minutos`
    });
  }
});

app.get('/cola/beneficiario', async (req, res) => {
  const users = await xprisma.usuario.findMany({
    where: {
      id: {
        in: cola.personas
      }
    }
  });
  const colaDePersonas: Usuario[] = cola.personas.map(persona => users.find(user => user.id === persona));
  const response: ApiResponse<Usuario[]> = {
    message: "Se encontró la cola",
    data: colaDePersonas
  }
  res.json(response);
});

export default app;