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
app.post('/carrito/enviar/:idUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const productosActivos = data.map(item => item.productoActivo);
    const activos = (0, filterOfertas_1.filterOfertas)(productosActivos);
    if (productosActivos.length === activos.length) {
        const venta = yield queries_1.default.venta.create({
            data: {
                usuarioId: req.params.idUsuario
            }
        });
        yield queries_1.default.detalleVenta.createMany({
            data: data.map(item => ({
                cantidad: item.cantidad,
                precioUnitario: item.productoActivo.precioDescontado,
                productoActivoId: item.productoActivo.id,
                ventaId: venta.id
            }))
        });
        const ventaConDetalles = yield queries_1.default.venta.findUnique({
            where: {
                id: venta.id
            },
            include: {
                detalles: {
                    include: {
                        productoActivo: {
                            include: {
                                producto: {
                                    include: {
                                        usuario: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
        const response = {
            message: "Se pidieron los productos correctamente",
            data: ventaConDetalles
        };
        res.json(response);
    }
    else {
        const notActive = productosActivos.filter(pa => !activos.find(a => a.id === pa.id));
        const response = {
            message: "Alguno de las ofertas ya no esta disponible",
            data: notActive
        };
        res.json(response);
    }
}));
app.put('/liketo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let message;
    let favorito;
    if (!data.favoritoId) {
        message = "Se añadio un favorito correctamente";
        favorito = yield queries_1.default.favorito.create({
            data: {
                restauranteId: data.restauranteId,
                usuarioId: data.usuarioId
            }
        });
    }
    else {
        message = "Se quito un favorito correctamente";
        favorito = yield queries_1.default.favorito.delete({
            where: {
                id: data.favoritoId
            }
        });
    }
    const response = {
        message,
        data: favorito
    };
    res.json(response);
}));
app.patch('/venta/estado/:idVenta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venta = yield queries_1.default.venta.update({
        where: {
            id: Number(req.params.idVenta)
        },
        data: {
            estado: req.body.estado
        }
    });
    const response = {
        message: "Estado de venta cambiado correctamente",
        data: venta
    };
    res.json(response);
}));
app.post('/donacion/pedir/:idBeneficiario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const donacion = yield queries_1.default.donacion.create({
        data: {
            beneficiarioId: req.params.idBeneficiario,
            donadorId: data.donadorId,
            estadoBeneficiario: "aceptado"
        }
    });
    yield queries_1.default.detalleDonacion.createMany({
        data: data.items.map(item => ({
            donacionId: donacion.id,
            cantidad: item.cantidad,
            productoId: item.productoActivo.producto.id
        }))
    });
    data.items.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
        yield queries_1.default.productoActivo.update({
            where: {
                id: item.productoActivo.id
            },
            data: {
                donado: true
            }
        });
    }));
    const response = {
        message: "Se pidieron los productos correctamente",
        data: donacion
    };
    res.json(response);
}));
app.patch('/donacion/beneficiario/:idDonacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donacion = yield queries_1.default.donacion.update({
        where: {
            id: Number(req.params.idDonacion)
        },
        data: {
            estadoBeneficiario: "aceptado"
        }
    });
    const response = {
        message: "Se acepto la donacion por parte del beneficiario",
        data: donacion
    };
    res.json(response);
}));
app.patch('/donacion/restaurante/:idDonacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donacion = yield queries_1.default.donacion.update({
        where: {
            id: Number(req.params.idDonacion)
        },
        data: {
            estadoDonador: "aceptado"
        }
    });
    const response = {
        message: "Se acepto la donacion por parte del restaurante",
        data: donacion
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=post.js.map