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
app.get('/detalleDonacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleDonacions = yield queries_1.default.detalleDonacion.findMany();
    const response = {
        message: "Detalles de donaciones obtenidas correctamente",
        data: detalleDonacions
    };
    res.json(response);
}));
app.get('/detalleDonacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleDonacion = yield queries_1.default.detalleDonacion.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Detalle de donacion obtenida correctamente",
        data: detalleDonacion
    };
    res.json(response);
}));
app.post('/detalleDonacion', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const detalleDonacion = yield queries_1.default.detalleDonacion.create({
        data: data
    });
    const response = {
        message: "Detalle de donacion creada correctamente",
        data: detalleDonacion
    };
    res.json(response);
}));
app.put('/detalleDonacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const detalleDonacion = yield queries_1.default.detalleDonacion.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Detalle de donacion actualizada correctamente",
        data: detalleDonacion
    };
    res.json(response);
}));
app.delete('/detalleDonacion/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const detalleDonacion = yield queries_1.default.detalleDonacion.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Detalle de donacion eliminada correctamente",
        data: detalleDonacion
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=detalleDonacion.js.map