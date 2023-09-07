import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { ProductoActivo } from "@prisma/client";
import { CreateProductoActivoInput, UpdateProductoActivoInput } from "../../interfaces/models/productoActivo";
import { sendPushNotification } from "../../utilities/notifications";

const app = Router();

app.get('/productoActivo', async (req, res) => {
  const productoActivos = await xprisma.productoActivo.findMany();
  const response: ApiResponse<ProductoActivo[]> = {
    message: "Productos Activos obtenidos correctamente",
    data: productoActivos
  }
  res.json(response);
});

app.get('/productoActivo/:id', async (req, res) => {
  const productoActivo = await xprisma.productoActivo.findUnique({
    where: {
      id: Number(req.params.id)
    }
  });
  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo obtenido correctamente",
    data: productoActivo
  };
  res.json(response);
});

app.post('/productoActivo', async (req, res) => {
  const data: CreateProductoActivoInput = req.body;
  const productoActivo = await xprisma.productoActivo.create({
    data: data,
    include: {
      producto: {
        include: {
          usuario: true
        }
      }
    }
  });

  const usersToNotify = await xprisma.usuario.findMany({
    where: {
      pushToken: {
        not: null
      }
    }
  });
  console.log(usersToNotify);
  await sendPushNotification(usersToNotify.map(user => ({
    to: user.pushToken,
    sound: "default",
    title: `¡Nueva oferta de ${productoActivo.producto.usuario.nombre}!`,
    body: `${productoActivo.producto.nombre} a tan solo Bs. ${productoActivo.precioDescontado}, ¡Aprovecha ahora mismo!`,
    data: {
      route: `verOferta/${productoActivo.id}`
    }
  })));

  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo creado correctamente",
    data: productoActivo
  };
  res.json(response);
});

app.put('/productoActivo/:id', async (req, res) => {
  const data: UpdateProductoActivoInput = req.body;
  const productoActivo = await xprisma.productoActivo.update({
    where: {
      id: Number(req.params.id)
    },
    data: data
  });
  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo actualizado correctamente",
    data: productoActivo
  }
  res.json(response);
});

app.delete('/productoActivo/:id', async (req, res) => {
  const productoActivo = await xprisma.productoActivo.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      eliminado: true
    }
  });
  const response: ApiResponse<ProductoActivo> = {
    message: "Producto Activo eliminado correctamente",
    data: productoActivo
  };
  res.json(response);
});

export default app;