import { Router } from 'express';
import { PrismaClient } from '@prisma/client'
import { CreateUsuarioInput, UpdateUsuarioInput, Usuario } from '../interfaces/usuario';
import { ApiResponse } from '../interfaces/apiResponse';

const app = Router();
const prisma = new PrismaClient();

app.get('/usuario', async (req, res) => {
  const users = await prisma.usuario.findMany();
  const response: ApiResponse<Usuario[]> = {
    message: "Usuarios obtenidos correctamente",
    data: users
  }
  res.json(response);
})

app.get('/usuario/:id', async (req, res) => {
  const user = await prisma.usuario.findUnique({
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
  const user = await prisma.usuario.create({
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
  const user = await prisma.usuario.update({
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
  const user = await prisma.usuario.delete({
    where: {
      id: req.params.id
    }
  });
  const response: ApiResponse<Usuario> = {
    message: "Usuario eliminado correctamente",
    data: user
  }
  res.json(response);
});

export default app;