import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { PedirResponse } from "../../interfaces/pages/pedir";
import { RestauranteResponse } from "../../interfaces/pages/restaurante";
import { filterOfertas } from "../../utilities/filterOfertas";
import { ProductoActivo } from "@prisma/client";

const app = Router();

app.get('/pedir', async (req, res) => {
  const categorias = await xprisma.categoria.findMany();
  const ofertas = filterOfertas(await xprisma.productoActivo.findMany());
  const response: ApiResponse<PedirResponse> = {
    message: "Datos obtenidos correctamente",
    data: {
      categorias,
      ofertas
    }
  }
  res.json(response);
});

app.get('/restaurante/:idRestaurante', async (req, res) => {
  const restaurante = await xprisma.usuario.findUnique({
    where: {
      id: req.params.idRestaurante
    }
  });
  const ofertasActivas = filterOfertas(await xprisma.productoActivo.findMany({
    where: {
      producto: {
        usuarioId: req.params.idRestaurante
      }
    }
  }));
  const categorias = await xprisma.categoria.findMany({
    where: {
      productos: {
        some: {
          usuarioId: req.params.idRestaurante
        }
      }
    }
  });
  const response: ApiResponse<RestauranteResponse> = {
    message: "Datos obtenidos correctamente",
    data: {
      restaurante,
      ofertasActivas,
      categorias
    }
  }
  res.json(response);
});

app.get('/ofertas/:idRestaurante', async (req, res) => {
  const ofertasActivas = filterOfertas(await xprisma.productoActivo.findMany({
    where: {
      producto: {
        usuarioId: req.params.idRestaurante
      }
    }
  }));
  const response: ApiResponse<ProductoActivo[]> = {
    message: "Se encontraron las ofertas activas",
    data: ofertasActivas
  };
  res.json(response);
});

export default app;