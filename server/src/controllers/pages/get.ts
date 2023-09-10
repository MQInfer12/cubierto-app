import { Router } from "express";
import xprisma from "../../middlewares/queries";
import { ApiResponse } from "../../interfaces/apiResponse";
import { PedirResponse } from "../../interfaces/pages/pedir";
import { RestauranteResponse } from "../../interfaces/pages/restaurante";
import { filterDonaciones, filterOfertas } from "../../utilities/filterOfertas";
import { Donacion, Notificacion, ProductoActivo, Usuario, Venta } from "@prisma/client";

const app = Router();

app.get('/pedir', async (req, res) => {
  const donaciones = await xprisma.donacion.findMany({
    where: {
      estadoBeneficiario: "aceptado",
      AND: {
        estadoDonador: "aceptado"
      }
    },
    orderBy: {
      id: "desc"
    },
    take: 4
  });
  const randomDonacion = donaciones[Math.floor(Math.random() * donaciones.length)];
  const categorias = await xprisma.categoria.findMany();
  const ofertas = filterOfertas(await xprisma.productoActivo.findMany());
  const response: ApiResponse<PedirResponse> = {
    message: "Datos obtenidos correctamente",
    data: {
      donacion: randomDonacion,
      categorias,
      ofertas
    }
  }
  res.json(response);
});

app.get('/pedir/user', async (req, res) => {
  const donaciones = await xprisma.donacion.findMany({
    where: {
      estadoBeneficiario: "aceptado",
      AND: {
        estadoDonador: "aceptado"
      }
    },
    orderBy: {
      id: "desc"
    },
    take: 4
  });
  const randomDonacion = donaciones[Math.floor(Math.random() * donaciones.length)];
  const categorias = await xprisma.categoria.findMany();
  const ofertas = filterOfertas(await xprisma.productoActivo.findMany({
    where: {
      producto: {
        usuario: {
          rol: "restaurante"
        }
      }
    }
  }));
  const response: ApiResponse<PedirResponse> = {
    message: "Datos obtenidos correctamente",
    data: {
      donacion: randomDonacion,
      categorias,
      ofertas
    }
  }
  res.json(response);
})

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
      },
      AND: {
        donado: false
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
    where: {
      donado: false
    },
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

app.get('/beneficiarios', async (req, res) => {
  const beneficiarios = await xprisma.usuario.findMany({
    where: {
      rol: "beneficiario"
    }
  });
  const response: ApiResponse<Usuario[]> = {
    message: "Beneficiarios obtenidos correctamente",
    data: beneficiarios
  }
  res.json(response);
});

app.get('/restaurantes', async (req, res) => {
  const restaurantes = await xprisma.usuario.findMany({
    where: {
      rol: "restaurante"
    }
  });

  restaurantes.sort((x, y) => {
    if (x.nombre < y.nombre) {
      return -1;
    }

    if (x.nombre > y.nombre) {
      return 1;
    }

    return x.id < y.id && -1;
  });

  const response: ApiResponse<Usuario[]> = {
    message: "Restaurantes obtenidos correctamente",
    data: restaurantes
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

const getDonations = async (req: any, res: any) => {
  const donaciones = await xprisma.donacion.findMany({
    where: {
      donadorId: req.params.id
    }
  });
  const response: ApiResponse<Donacion[]> = {
    message: "Mis donaciones obtenidas correctamente",
    data: donaciones
  }
  res.json(response);
}

app.get('/donaciones/restaurante/:id', async (req, res) => {
  getDonations(req, res);
});

app.get('/donaciones/proveedor/:id', async (req, res) => {
  getDonations(req, res);
});

app.get('/notificaciones/usuario/:idUsuario', async (req, res) => {
  const notificaciones = await xprisma.notificacion.findMany({
    where: {
      usuarioId: req.params.idUsuario
    },
    include: {
      usuarioDe: true
    }
  });
  const response: ApiResponse<Notificacion[]> = {
    message: "Notificaciones de usuario obtenidas correctamente",
    data: notificaciones
  }
  res.json(response);
});

export default app;