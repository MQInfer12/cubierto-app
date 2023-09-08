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
const notifications_1 = require("../../utilities/notifications");
const app = (0, express_1.Router)();
app.get('/productoActivo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productoActivos = yield queries_1.default.productoActivo.findMany();
    const response = {
        message: "Productos Activos obtenidos correctamente",
        data: productoActivos
    };
    res.json(response);
}));
app.get('/productoActivo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productoActivo = yield queries_1.default.productoActivo.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Producto Activo obtenido correctamente",
        data: productoActivo
    };
    res.json(response);
}));
app.post('/productoActivo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const productoActivo = yield queries_1.default.productoActivo.create({
        data: data,
        include: {
            producto: {
                include: {
                    usuario: true
                }
            }
        }
    });
    const response = {
        message: "Producto Activo creado correctamente",
        data: productoActivo
    };
    yield (0, notifications_1.notifyNuevaOferta)(productoActivo);
    res.json(response);
}));
app.put('/productoActivo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const productoActivo = yield queries_1.default.productoActivo.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Producto Activo actualizado correctamente",
        data: productoActivo
    };
    res.json(response);
}));
app.delete('/productoActivo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productoActivo = yield queries_1.default.productoActivo.update({
        where: {
            id: Number(req.params.id)
        },
        data: {
            eliminado: true
        }
    });
    const response = {
        message: "Producto Activo eliminado correctamente",
        data: productoActivo
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=productoActivo.js.map