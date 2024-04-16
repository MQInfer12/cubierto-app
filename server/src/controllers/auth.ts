import { Router } from "express";
import { PrismaClient, Usuario } from "@prisma/client";
import { ApiResponse } from "../interfaces/apiResponse";

const app = Router();
const prisma = new PrismaClient();

interface GoogleUser {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

const checkGoogleUserId = async (googleUser: GoogleUser) => {
  let user = await prisma.usuario.findUnique({
    where: {
      id: googleUser.sub,
    },
  });
  if (!user) {
    user = await prisma.usuario.create({
      data: {
        id: googleUser.sub,
        nombre: googleUser.name,
        email: googleUser.email,
        foto: googleUser.picture,
      },
    });
  }
  return user;
};

const signUp = async (code: string, appUrl: string, res: any) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const BACKEND_URL = process.env.BACKEND_URL;

  try {
    const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${BACKEND_URL}google&state=1234_purpleGoogle&grant_type=authorization_code`;
    console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      const verify = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${data.id_token}`
      );
      if (verify.ok) {
        const userData = await verify.json();
        const googleUser: GoogleUser = userData;
        const user = await checkGoogleUserId(googleUser);
        console.log(`Sending script to ${appUrl}`);
        res.send(
          `<script>window.location.replace("${appUrl}?userId=${user.id}")</script>`
        );
      }
    } else {
      res.json({
        error: "¡Ocurrió un error inesperado, inténtalo de nuevo!",
        data: await response.json(),
      });
    }
  } catch (e) {
    res.json({
      error: "¡Ocurrió un error inesperado, inténtalo de nuevo!",
    });
  }
};

app.get("/google", async (req, res) => {
  const { code, state: appUrl } = req.query;
  if (!code) {
    return res.status(400).json({
      error: "Código inválido",
    });
  }
  signUp(code as string, appUrl as string, res);
});

app.post("/google/login", async (req, res) => {
  const credential = req.body.credential;
  try {
    const resUserData = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`
    );
    if (resUserData.ok) {
      const userData: GoogleUser = await resUserData.json();
      const user = await checkGoogleUserId(userData);
      const response: ApiResponse<Usuario> = {
        message: "Datos del usuario encontrados correctamente",
        data: user,
      };
      res.json(response);
    }
  } catch (e) {
    res.json({
      error: "¡Ocurrió un error inesperado, inténtalo de nuevo!",
    });
  }
});

export default app;
