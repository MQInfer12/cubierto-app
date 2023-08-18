import { Router } from 'express';
import { PrismaClient } from '@prisma/client'

const app = Router();
const prisma = new PrismaClient();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;

const signUp = async (code: string, appUrl: string, res: any) => {
  try {
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${BACKEND_URL}google&state=1234_purpleGoogle&grant_type=authorization_code`;
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
        console.log(`Sending script to ${appUrl}`);
        res.send(`<script>window.location.replace("${appUrl}?userId=${sub}")</script>`);
      }
    }
  } catch (e) {
    res.json({
      error: "¡Ocurrió un error inesperado, inténtalo de nuevo!"
    })
  }
}

app.get("/google", async (req, res) => {
  console.log(req.query);
  const { code, state: appUrl } = req.query;
  if(!code) {
    return res.status(400).json({
      error: "Código inválido"
    })
  }
  signUp(code as string, appUrl as string, res);
});

export default app;