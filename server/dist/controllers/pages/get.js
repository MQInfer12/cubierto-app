"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const queries_1 = __importDefault(require("../../middlewares/queries"));
const filterOfertas_1 = require("../../utilities/filterOfertas");
const app = (0, express_1.Router)();
app.get('/pedir', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donaciones = yield queries_1.default.donacion.findMany({
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
    const categorias = yield queries_1.default.categoria.findMany();
    const ofertas = (0, filterOfertas_1.filterOfertas)(yield queries_1.default.productoActivo.findMany());
    const response = {
        message: "Datos obtenidos correctamente",
        data: {
            donacion: randomDonacion,
            categorias,
            ofertas
        }
    };
    res.json(response);
}));
app.get('/pedir/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donaciones = yield queries_1.default.donacion.findMany({
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
    const categorias = yield queries_1.default.categoria.findMany();
    const ofertas = (0, filterOfertas_1.filterOfertas)(yield queries_1.default.productoActivo.findMany({
        where: {
            producto: {
                usuario: {
                    rol: "restaurante"
                }
            }
        }
    }));
    const response = {
        message: "Datos obtenidos correctamente",
        data: {
            donacion: randomDonacion,
            categorias,
            ofertas
        }
    };
    res.json(response);
}));
app.get('/restaurante/:idRestaurante', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurante = yield queries_1.default.usuario.findUnique({
        where: {
            id: req.params.idRestaurante
        }
    });
    const ofertasActivas = (0, filterOfertas_1.filterOfertas)(yield queries_1.default.productoActivo.findMany({
        where: {
            producto: {
                usuarioId: req.params.idRestaurante
            }
        }
    }));
    const categorias = yield queries_1.default.categoria.findMany({
        where: {
            productos: {
                some: {
                    usuarioId: req.params.idRestaurante
                }
            }
        }
    });
    const response = {
        message: "Datos obtenidos correctamente",
        data: {
            restaurante,
            ofertasActivas,
            categorias
        }
    };
    res.json(response);
}));
app.get('/ofertas/:idRestaurante', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ofertasActivas = yield queries_1.default.productoActivo.findMany({
        where: {
            producto: {
                usuarioId: req.params.idRestaurante
            },
            AND: {
                donado: false
            }
        }
    });
    const response = {
        message: "Se encontraron las ofertas activas",
        data: ofertasActivas
    };
    res.json(response);
}));
app.get('/pendientes/:idRestaurante', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ventas = yield queries_1.default.venta.findMany({
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
        if (venta.estado === "pendiente") {
            const fecha = new Date(venta.fecha);
            const milliseconds = ahora.getTime() - fecha.getTime();
            const seconds = milliseconds / 1000;
            const minutes = seconds / 60;
            return minutes < 20;
        }
        return venta.estado === "aceptado";
    });
    const response = {
        message: "Ventas encontradas correctamente",
        data: ventas
    };
    res.json(response);
}));
app.get('/pedidos/:idUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ventas = yield queries_1.default.venta.findMany({
        where: {
            usuarioId: req.params.idUsuario
        }
    });
    const response = {
        message: "Pedidos obtenidos correctamente",
        data: ventas
    };
    res.json(response);
}));
app.get('/venta/completado/:idRestaurante', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let ventas = yield queries_1.default.venta.findMany({
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
    const response = {
        message: "Ventas obtenidas correctamente",
        data: ventas
    };
    res.json(response);
}));
app.get('/donaciones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ofertas = yield queries_1.default.productoActivo.findMany({
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
            if (detalle.venta.estado === "pendiente") {
                const ahora = new Date();
                const publicado = new Date(detalle.venta.fecha);
                const milliseconds = ahora.getTime() - publicado.getTime();
                const seconds = milliseconds / 1000;
                const minutes = seconds / 60;
                if (minutes < 20) {
                    suma += detalle.cantidad;
                }
            }
            else {
                suma += detalle.cantidad;
            }
            return suma;
        }, 0);
        oferta.cantidad = stock - stockADescontar;
        return oferta;
    });
    const ofertasFinal = (0, filterOfertas_1.filterDonaciones)(ofertasRes);
    const response = {
        message: "Donaciones obtenidas correctamente",
        data: ofertasFinal
    };
    res.json(response);
}));
app.get('/beneficiarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beneficiarios = yield queries_1.default.usuario.findMany({
        where: {
            rol: "beneficiario"
        }
    });
    const response = {
        message: "Beneficiarios obtenidos correctamente",
        data: beneficiarios
    };
    res.json(response);
}));
app.get('/restaurantes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const restaurantes = yield queries_1.default.usuario.findMany({
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
    const response = {
        message: "Restaurantes obtenidos correctamente",
        data: restaurantes
    };
    res.json(response);
}));
app.get('/donaciones/beneficiario/:idBeneficiario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donaciones = yield queries_1.default.donacion.findMany({
        where: {
            beneficiarioId: req.params.idBeneficiario
        }
    });
    const response = {
        message: "Mis donaciones obtenidas correctamente",
        data: donaciones
    };
    res.json(response);
}));
const getDonations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donaciones = yield queries_1.default.donacion.findMany({
        where: {
            donadorId: req.params.id
        }
    });
    const response = {
        message: "Mis donaciones obtenidas correctamente",
        data: donaciones
    };
    res.json(response);
});
app.get('/donaciones/restaurante/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    getDonations(req, res);
}));
app.get('/donaciones/proveedor/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    getDonations(req, res);
}));
app.get('/notificaciones/usuario/:idUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notificaciones = yield queries_1.default.notificacion.findMany({
        where: {
            usuarioId: req.params.idUsuario
        },
        include: {
            usuarioDe: true
        }
    });
    const response = {
        message: "Notificaciones de usuario obtenidas correctamente",
        data: notificaciones
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=get.js.map