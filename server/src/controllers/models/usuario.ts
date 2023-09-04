import { Router } from 'express';
import { CreateUsuarioInput, UpdateUsuarioInput } from '../../interfaces/models/usuario';
import { ApiResponse } from '../../interfaces/apiResponse';
import xprisma from '../../middlewares/queries';
import { Usuario } from '@prisma/client';

const app = Router();

app.get('/usuario', async (req, res) => {
  const users = await xprisma.usuario.findMany({
    where: {
      eliminado: undefined
    }
  });
  const response: ApiResponse<Usuario[]> = {
    message: "Usuarios obtenidos correctamente",
    data: users
  }
  res.json(response);
})

app.get('/usuario/:id', async (req, res) => {
  const user = await xprisma.usuario.findUnique({
    where: {
      id: req.params.id
    }
  });
  const response: ApiResponse<Usuario> = {
    message: "Usuario obtenido correctamente",
    data: user
  }
  res.json(response);
});

app.post('/usuario', async (req, res) => {
  const data: CreateUsuarioInput = req.body;
  const user = await xprisma.usuario.create({
    data: data
  });
  const response: ApiResponse<Usuario> = {
    message: "Usuario creado correctamente",
    data: user
  }
  res.json(response);
});

app.put('/usuario/:id', async (req, res) => {
  const data: UpdateUsuarioInput = req.body;
  const user = await xprisma.usuario.update({
    where: {
      id: req.params.id
    },
    data: data
  });
  const response: ApiResponse<Usuario> = {
    message: "Usuario modificado correctamente",
    data: user
  }
  res.json(response);
});

app.delete('/usuario/:id', async (req, res) => {
  const user = await xprisma.usuario.update({
    where: {
      id: req.params.id
    },
    data: {
      eliminado: true
    }
  });
  const response: ApiResponse<Usuario> = {
    message: "Usuario eliminado correctamente",
    data: user
  }
  res.json(response);
});

export default app;