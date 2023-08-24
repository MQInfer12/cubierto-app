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
const app = (0, express_1.Router)();
app.post('/carrito/enviar/:idUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venta = yield queries_1.default.venta.create({
        data: {
            usuarioId: req.params.idUsuario
        }
    });
    const data = req.body;
    yield queries_1.default.detalleVenta.createMany({
        data: data.map(item => ({
            cantidad: item.cantidad,
            precioUnitario: item.productoActivo.precioDescontado,
            productoActivoId: item.productoActivo.id,
            ventaId: venta.id
        }))
    });
    const response = {
        message: "Se pidieron los productos correctamente",
        data: venta
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=post.js.map