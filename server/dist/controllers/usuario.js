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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const app = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
app.get('/usuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.usuario.findMany();
    res.json(users);
}));
app.get('/usuario/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.usuario.findUnique({
        where: {
            id: req.params.id
        }
    });
    res.json(user);
}));
app.post('/usuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.usuario.create({
        data: {
            id: req.body.id,
            nombre: req.body.nombre,
            email: req.body.email,
            foto: req.body.foto,
        }
    });
    res.json({
        message: "Usuario creado correctamente",
        data: user
    });
}));
app.put('/usuario/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.usuario.update({
        where: {
            id: req.params.id
        },
        data: {
            nombre: req.body.nombre,
            email: req.body.email,
            foto: req.body.foto,
            descripcion: req.body.descripcion,
            portada: req.body.portada,
            telefono: Number(req.body.telefono)
        }
    });
    res.json({
        message: "Usuario modificado correctamente",
        data: user
    });
}));
app.delete('/usuario/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.usuario.delete({
        where: {
            id: req.params.id
        }
    });
    res.json({
        message: "Usuario eliminado correctamente",
        data: user
    });
}));
exports.default = app;
//# sourceMappingURL=usuario.js.map