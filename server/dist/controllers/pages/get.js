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
    const categorias = yield queries_1.default.categoria.findMany();
    const ofertas = (0, filterOfertas_1.filterOfertas)(yield queries_1.default.productoActivo.findMany());
    const response = {
        message: "Datos obtenidos correctamente",
        data: {
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
    const ofertasActivas = (0, filterOfertas_1.filterOfertas)(yield queries_1.default.productoActivo.findMany({
        where: {
            producto: {
                usuarioId: req.params.idRestaurante
            }
        }
    }));
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
                            usuarioId: "117585476927134335712"
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
exports.default = app;
//# sourceMappingURL=get.js.map