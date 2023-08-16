import { Router } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

app.get('/usuario', async (req, res) => {
  const users = await prisma.usuario.findMany();
  res.json(users);
})

app.get('/usuario/:id', async (req, res) => {
  const user = await prisma.usuario.findUnique({
    where: {
      id: req.params.id
    }
  });
  res.json(user);
});

app.post('/usuario', async (req, res) => {
  const user = await prisma.usuario.create({
    data: {
      id: req.body.id,
      nombre: req.body.nombre,
      email: req.body.email,
      foto: req.body.foto,
    }
  });
  res.json({
    message: "Usuario creado correctamente",
    data: user
  });
});

app.put('/usuario/:id', async (req, res) => {
  const user = await prisma.usuario.update({
    where: {
      id: req.params.id
    },
    data: {
      nombre: req.body.nombre,
      email: req.body.email,
      foto: req.body.foto,
      descripcion: req.body.descripcion,
      portada: req.body.portada,
      telefono: Number(req.body.telefono)
    }
  });
  res.json({
    message: "Usuario modificado correctamente",
    data: user
  });
});

app.delete('/usuario/:id', async (req, res) => {
  const user = await prisma.usuario.delete({
    where: {
      id: req.params.id
    }
  });
  res.json({
    message: "Usuario eliminado correctamente",
    data: user
  })
});

export default app;