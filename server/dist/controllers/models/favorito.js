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
app.get('/favorito', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoritos = yield queries_1.default.favorito.findMany();
    const response = {
        message: "Favoritos obtenidos correctamente",
        data: favoritos
    };
    res.json(response);
}));
app.get('/favorito/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favorito = yield queries_1.default.favorito.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Favorito obtenido correctamente",
        data: favorito
    };
    res.json(response);
}));
app.post('/favorito', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const favorito = yield queries_1.default.favorito.create({
        data: data
    });
    const response = {
        message: "Favorito creado correctamente",
        data: favorito
    };
    res.json(response);
}));
app.put('/favorito/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const favorito = yield queries_1.default.favorito.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Favorito actualizado correctamente",
        data: favorito
    };
    res.json(response);
}));
app.delete('/favorito/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favorito = yield queries_1.default.favorito.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Favorito eliminado correctamente",
        data: favorito
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=favorito.js.map