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
app.get('/producto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield queries_1.default.producto.findMany();
    const response = {
        message: "Productos obtenidos correctamente",
        data: productos
    };
    res.json(response);
}));
app.get('/producto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield queries_1.default.producto.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Producto obtenido correctamente",
        data: producto
    };
    res.json(response);
}));
app.post('/producto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const producto = yield queries_1.default.producto.create({
        data: data
    });
    const response = {
        message: "Producto creado correctamente",
        data: producto
    };
    res.json(response);
}));
app.put('/producto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const producto = yield queries_1.default.producto.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Producto actualizado correctamente",
        data: producto
    };
    res.json(response);
}));
app.delete('/producto/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const producto = yield queries_1.default.producto.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Producto eliminado correctamente",
        data: producto
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=producto.js.map