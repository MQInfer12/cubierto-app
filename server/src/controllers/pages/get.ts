import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { PedirResponse } from "../../interfaces/pages/pedir";
import { RestauranteResponse } from "../../interfaces/pages/restaurante";
import { filterDonaciones, filterOfertas } from "../../utilities/filterOfertas";
import { Donacion, ProductoActivo, Venta } from "@prisma/client";

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
  const ofertasActivas = await xprisma.productoActivo.findMany({
    where: {
      producto: {
        usuarioId: req.params.idRestaurante
      }
    }
  });
  const response: ApiResponse<ProductoActivo[]> = {
    message: "Se encontraron las ofertas activas",
    data: ofertasActivas
  };
  res.json(response);
});

app.get('/pendientes/:idRestaurante', async (req, res) => {
  let ventas = await xprisma.venta.findMany({
    where: {
      detalles: {
        every: {
          productoActivo: {
            producto: {
              usuarioId: req.params.idRestaurante
            }
          }
        }
      }
    }
  });
  const ahora = new Date();
  ventas = ventas.filter(venta => {
    if(venta.estado === "pendiente") {
      const fecha = new Date(venta.fecha);
      const milliseconds = ahora.getTime() - fecha.getTime();
      const seconds = milliseconds / 1000;
      const minutes = seconds / 60;
      return minutes < 20;
    }
    return venta.estado === "aceptado";
  });
  const response: ApiResponse<Venta[]> = {
    message: "Ventas encontradas correctamente",
    data: ventas
  }
  res.json(response);
});

app.get('/pedidos/:idUsuario', async (req, res) => {
  const ventas = await xprisma.venta.findMany({
    where: {
      usuarioId: req.params.idUsuario
    }
  });
  const response: ApiResponse<Venta[]> = {
    message: "Pedidos obtenidos correctamente",
    data: ventas
  }
  res.json(response);
});

app.get('/venta/completado/:idRestaurante', async (req, res) => {
  let ventas = await xprisma.venta.findMany({
    where: {
      detalles: {
        every: {
          productoActivo: {
            producto: {
              usuarioId: req.params.idRestaurante
            }
          }
        }
      },
      AND: {
        estado: "recogido"
      }
    }
  });
  const response: ApiResponse<Venta[]> = {
    message: "Ventas obtenidas correctamente",
    data: ventas
  }
  res.json(response);
});

app.get('/donaciones', async (req, res) => {
  const ofertas = await xprisma.productoActivo.findMany({
    include: {
      detalleVentas: {
        include: {
          venta: {
            select: {
              estado: true,
              fecha: true
            }
          }
        }
      }
    }
  });
  const ofertasRes = ofertas.map(oferta => {
    const stock = oferta.cantidad;
    const stockADescontar = oferta.detalleVentas.reduce((suma, detalle) => {
      if(detalle.venta.estado === "pendiente") {
        const ahora = new Date();
        const publicado = new Date(detalle.venta.fecha);
        const milliseconds = ahora.getTime() - publicado.getTime();
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        if (minutes < 20) {
          suma += detalle.cantidad;
        }
      } else {
        suma += detalle.cantidad;
      }
      return suma;
    }, 0);
    oferta.cantidad = stock - stockADescontar;
    return oferta;
  });
  const ofertasFinal = filterDonaciones(ofertasRes);

  const response: ApiResponse<ProductoActivo[]> = {
    message: "Donaciones obtenidas correctamente",
    data: ofertasFinal
  }
  res.json(response);
});

app.get('/donaciones/beneficiario/:idBeneficiario', async (req, res) => {
  const donaciones = await xprisma.donacion.findMany({
    where: {
      beneficiarioId: req.params.idBeneficiario
    }
  });
  const response: ApiResponse<Donacion[]> = {
    message: "Mis donaciones obtenidas correctamente",
    data: donaciones
  }
  res.json(response);
})

app.get('/donaciones/restaurante/:idRestaurante', async (req, res) => {
  const donaciones = await xprisma.donacion.findMany({
    where: {
      donadorId: req.params.idRestaurante
    }
  });
  const response: ApiResponse<Donacion[]> = {
    message: "Mis donaciones obtenidas correctamente",
    data: donaciones
  }
  res.json(response);
})

export default app;