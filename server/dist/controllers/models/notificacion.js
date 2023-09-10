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
app.get('/notificacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notificacions = yield queries_1.default.notificacion.findMany();
    const response = {
        message: "Notificaciones obtenidas correctamente",
        data: notificacions
    };
    res.json(response);
}));
app.get('/notificacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notificacion = yield queries_1.default.notificacion.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Notificacion obtenida correctamente",
        data: notificacion
    };
    res.json(response);
}));
app.post('/notificacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const notificacion = yield queries_1.default.notificacion.create({
        data: data
    });
    const response = {
        message: "Notificacion creada correctamente",
        data: notificacion
    };
    res.json(response);
}));
app.put('/notificacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const notificacion = yield queries_1.default.notificacion.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Notificacion actualizada correctamente",
        data: notificacion
    };
    res.json(response);
}));
app.delete('/notificacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notificacion = yield queries_1.default.notificacion.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Notificacion eliminada correctamente",
        data: notificacion
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=notificacion.js.map