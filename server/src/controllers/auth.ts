import { Router } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;

async function signUp(code: any, res: any) {
  const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${BACKEND_URL}google&grant_type=authorization_code`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  if(response.ok) {
    const data = await response.json();
    const verify = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${data.id_token}`);
    if(verify.ok) {
      const userData = await verify.json();
      const { sub, name, email, picture } = userData;
      let user = await prisma.usuario.findUnique({
        where: {
          id: sub
        }
      });
      if(!user) {
        user = await prisma.usuario.create({
          data: {
            id: sub,
            nombre: name,
            email: email,
            foto: picture
          }
        });
      }
      res.send(`<script>window.location.replace("exp://192.168.0.29:8081?userId=${user.id}")</script>`);
    }
  }
}

app.get("/google", async (req, res) => {
  const { code } = req.query;
  if(!code) {
    return res.status(400).json({
      error: "Código inválido"
    })
  }
  signUp(code, res);
});

export default app;