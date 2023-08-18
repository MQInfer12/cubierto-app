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
app.get('/categoria', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield queries_1.default.categoria.findMany();
    const response = {
        message: "Categorias obtenidas correctamente",
        data: categorias
    };
    res.json(response);
}));
app.get('/categoria/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield queries_1.default.categoria.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Categoria obtenida correctamente",
        data: categoria
    };
    res.json(response);
}));
app.post('/categoria', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const categoria = yield queries_1.default.categoria.create({
        data: data
    });
    const response = {
        message: "Categoria creada correctamente",
        data: categoria
    };
    res.json(response);
}));
app.put('/categoria/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const categoria = yield queries_1.default.categoria.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Categoria actualizada correctamente",
        data: categoria
    };
    res.json(response);
}));
app.delete('/categoria/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoria = yield queries_1.default.categoria.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Categoria eliminada correctamente",
        data: categoria
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=categoria.js.map