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
const queries_1 = __importDefault(require("../middlewares/queries"));
const app = (0, express_1.Router)();
app.get('/detalleVenta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleVentas = yield queries_1.default.detalleVenta.findMany();
    const response = {
        message: "Detalles de ventas obtenidas correctamente",
        data: detalleVentas
    };
    res.json(response);
}));
app.get('/detalleVenta/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleVenta = yield queries_1.default.detalleVenta.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Detalle de venta obtenida correctamente",
        data: detalleVenta
    };
    res.json(response);
}));
app.post('/detalleVenta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const detalleVenta = yield queries_1.default.detalleVenta.create({
        data: data
    });
    const response = {
        message: "Detalle de venta creada correctamente",
        data: detalleVenta
    };
    res.json(response);
}));
app.put('/detalleVenta/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const detalleVenta = yield queries_1.default.detalleVenta.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Detalle de venta actualizada correctamente",
        data: detalleVenta
    };
    res.json(response);
}));
app.delete('/detalleVenta/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleVenta = yield queries_1.default.detalleVenta.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Detalle de venta eliminada correctamente",
        data: detalleVenta
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=detalleVenta.js.map