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
app.get('/donacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donacions = yield queries_1.default.donacion.findMany();
    const response = {
        message: "Donaciones obtenidas correctamente",
        data: donacions
    };
    res.json(response);
}));
app.get('/donacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donacion = yield queries_1.default.donacion.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Donacion obtenida correctamente",
        data: donacion
    };
    res.json(response);
}));
app.post('/donacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const donacion = yield queries_1.default.donacion.create({
        data: data
    });
    const response = {
        message: "Donacion creada correctamente",
        data: donacion
    };
    res.json(response);
}));
app.put('/donacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const donacion = yield queries_1.default.donacion.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Donacion actualizada correctamente",
        data: donacion
    };
    res.json(response);
}));
app.delete('/donacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const donacion = yield queries_1.default.donacion.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Donacion eliminada correctamente",
        data: donacion
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=donacion.js.map