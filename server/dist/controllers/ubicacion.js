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
app.get('/ubicacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ubicaciones = yield queries_1.default.ubicacion.findMany();
    const response = {
        message: "Ubicaciones obtenidas correctamente",
        data: ubicaciones
    };
    res.json(response);
}));
app.get('/ubicacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ubicacion = yield queries_1.default.ubicacion.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Ubicacion obtenido correctamente",
        data: ubicacion
    };
    res.json(response);
}));
app.post('/ubicacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const ubicacion = yield queries_1.default.ubicacion.create({
        data: data
    });
    const response = {
        message: "Ubicacion creada correctamente",
        data: ubicacion
    };
    res.json(response);
}));
app.put('/ubicacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const ubicacion = yield queries_1.default.ubicacion.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Ubicacion actualizada correctamente",
        data: ubicacion
    };
    res.json(response);
}));
app.delete('/ubicacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ubicacion = yield queries_1.default.ubicacion.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Ubicacion eliminada correctamente",
        data: ubicacion
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=ubicacion.js.map