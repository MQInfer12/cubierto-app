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
const pusher_1 = __importDefault(require("../../utilities/pusher"));
const colaBeneficiario_1 = require("../../utilities/colaBeneficiario");
const queries_1 = __importDefault(require("../../middlewares/queries"));
const app = (0, express_1.Router)();
app.put('/cola/beneficiario/entrar/:usuarioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!colaBeneficiario_1.cola.personas.includes(req.params.usuarioId)) {
        colaBeneficiario_1.cola.personas.push(req.params.usuarioId);
    }
    if (colaBeneficiario_1.cola.personas.length === 1) {
        colaBeneficiario_1.cola.updatedAt = new Date();
    }
    const response = {
        message: "Un usuario ingreso a la cola",
        data: colaBeneficiario_1.cola
    };
    res.json(response);
}));
app.delete('/cola/beneficiario/salir/:usuarioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (colaBeneficiario_1.cola.personas[0] === req.params.usuarioId) {
        colaBeneficiario_1.cola.updatedAt = new Date();
    }
    colaBeneficiario_1.cola.personas = colaBeneficiario_1.cola.personas.filter(persona => persona !== req.params.usuarioId);
    yield pusher_1.default.trigger("cola-channel", "beneficiario", colaBeneficiario_1.cola);
    const response = {
        message: `Un usuario salio de la cola`,
        data: colaBeneficiario_1.cola
    };
    res.json(response);
}));
app.put('/cola/beneficiario/expulsarprimero', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!colaBeneficiario_1.cola.personas.length) {
        return res.json({
            "message": "La cola está vacía"
        });
    }
    const ahora = new Date();
    const diff = ahora.getTime() - colaBeneficiario_1.cola.updatedAt.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    if (minutes > 5) {
        colaBeneficiario_1.cola.personas.shift();
        colaBeneficiario_1.cola.updatedAt = new Date();
        yield pusher_1.default.trigger("cola-channel", "beneficiario", colaBeneficiario_1.cola);
        res.json({
            "message": `Se retiró al primer lugar de la cola después de ${Math.floor(minutes)} minutos`
        });
    }
    else {
        res.json({
            "message": `El primer lugar de la cola aún tiene ${5 - Math.floor(minutes)} minutos`
        });
    }
}));
app.get('/cola/beneficiario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield queries_1.default.usuario.findMany({
        where: {
            id: {
                in: colaBeneficiario_1.cola.personas
            }
        }
    });
    const colaDePersonas = colaBeneficiario_1.cola.personas.map(persona => users.find(user => user.id === persona));
    const response = {
        message: "Se encontró la cola",
        data: colaDePersonas
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=colaBeneficiario.js.map