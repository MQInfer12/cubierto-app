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
app.get('/venta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ventas = yield queries_1.default.venta.findMany();
    const response = {
        message: "Ventas obtenidas correctamente",
        data: ventas
    };
    res.json(response);
}));
app.get('/venta/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venta = yield queries_1.default.venta.findUnique({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Venta obtenida correctamente",
        data: venta
    };
    res.json(response);
}));
app.post('/venta', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const venta = yield queries_1.default.venta.create({
        data: data
    });
    const response = {
        message: "Venta creada correctamente",
        data: venta
    };
    res.json(response);
}));
app.put('/venta/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const venta = yield queries_1.default.venta.update({
        where: {
            id: Number(req.params.id)
        },
        data: data
    });
    const response = {
        message: "Venta actualizada correctamente",
        data: venta
    };
    res.json(response);
}));
app.delete('/venta/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const venta = yield queries_1.default.venta.delete({
        where: {
            id: Number(req.params.id)
        }
    });
    const response = {
        message: "Venta eliminada correctamente",
        data: venta
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=venta.js.map