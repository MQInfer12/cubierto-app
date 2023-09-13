import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { CreateColaInput } from "../../interfaces/models/cola";
import { ApiResponse } from "../../interfaces/apiResponse";
import { Cola, ProductoActivo, Usuario } from "@prisma/client";
import pusher from "../../utilities/pusher";
import { filterOfertas } from "../../utilities/filterOfertas";

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
  productoActivos?: ProductoActivo[]
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
  const restauranteId = salio.restauranteId;

  //DATOS PARA ACTUALIZAR
  const cola = await xprisma.cola.findMany({
    where: {
      restauranteId: restauranteId
    }
  });
  const productoActivos = filterOfertas(await xprisma.productoActivo.findMany({
    where: {
      producto: {
        usuarioId: restauranteId
      }
    }
  }));
  const response: ApiResponse<SalirColaResponse> = {
    message: salio.usuario.nombre + " salió de la cola",
    data: {
      cola,
      productoActivos
    }
  }
  await pusher.trigger("cola-channel", restauranteId, response);
  res.json(response);
});

app.get('/cola/restaurante/:idRestaurante', async (req, res) => {
  const cola = await xprisma.cola.findMany({
    where: {
      restauranteId: req.params.idRestaurante
    },
    include: {
      usuario: true
    }
  });
  const response: ApiResponse<(Usuario & {
    colaId: number
  })[]> = {
    message: "Cola de restaurante obtenida correctamente",
    data: cola.map(c => ({...c.usuario, colaId: c.id }))
  }
  res.json(response);
});

app.put('/cola/restaurante/vaciar/:idRestaurante', async (req, res) => {
  await xprisma.cola.deleteMany({
    where: {
      restauranteId: req.params.idRestaurante
    }
  });
  const response: ApiResponse<SalirColaResponse> = {
    message: "Cola de restaurante vaciada",
    data: {
      cola: []
    }
  }
  await pusher.trigger("cola-channel", req.params.idRestaurante, response);
  res.json(response);
});

export default app; 