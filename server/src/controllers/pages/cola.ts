import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { CreateColaInput } from "../../interfaces/models/cola";
import { ApiResponse } from "../../interfaces/apiResponse";
import { Cola, ProductoActivo } from "@prisma/client";
import pusher from "../../utilities/pusher";

const app = Router();

app.post('/cola/entrar', async (req, res) => {
  const data: CreateColaInput = req.body;
  const existente = await xprisma.cola.findUnique({
    where: {
      usuarioId: data.usuarioId
    }
  });
  if(!existente) {
    await xprisma.cola.create({
      data: data,
      include: {
        usuario: true
      }
    });
  }
  const cola = await xprisma.cola.findMany({
    where: {
      restauranteId: data.restauranteId
    }
  });
  const response: ApiResponse<Cola[]> = {
    message: "Ingresaste a la cola",
    data: cola
  }
  res.json(response);
}); 

interface SalirColaResponse {
  cola: Cola[]
  productoActivos: ProductoActivo[]
}

app.delete('/cola/salir/:id', async (req, res) => {
  const salio = await xprisma.cola.delete({
    where: {
      id: Number(req.params.id)
    },
    include: {
      usuario: true
    }
  });

  //DATOS PARA ACTUALIZAR
  const cola = await xprisma.cola.findMany({
    where: {
      restauranteId: salio.restauranteId
    }
  });
  const productoActivos = await xprisma.productoActivo.findMany({
    where: {
      producto: {
        usuarioId: salio.restauranteId
      }
    }
  });

  const response: ApiResponse<SalirColaResponse> = {
    message: salio.usuario.nombre + " salió de la cola",
    data: {
      cola,
      productoActivos
    }
  }
  await pusher.trigger("cola-channel", "salir", response);
  res.json(response);
});

export default app; 