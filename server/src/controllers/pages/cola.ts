import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { CreateColaInput } from "../../interfaces/models/cola";
import { ApiResponse } from "../../interfaces/apiResponse";
import { Cola } from "@prisma/client";
import pusher from "../../utilities/pusher";

const app = Router();

app.post('/cola/entrar', async (req, res) => {
  const data: CreateColaInput = req.body;
  const cola = await xprisma.cola.create({
    data: data,
    include: {
      usuario: true
    }
  });
  const response: ApiResponse<Cola> = {
    message: cola.usuario.nombre + " ingresó a la cola",
    data: cola
  }
  res.json(response);
}); 

app.delete('/cola/salir/:id', async (req, res) => {
  const cola = await xprisma.cola.delete({
    where: {
      id: Number(req.params.id)
    },
    include: {
      usuario: true
    }
  });
  const response: ApiResponse<Cola> = {
    message: cola.usuario.nombre + " salió de la cola",
    data: cola
  }
  pusher.trigger("cola-channel", "salir", cola);
  res.json(response);
});

export default app; 