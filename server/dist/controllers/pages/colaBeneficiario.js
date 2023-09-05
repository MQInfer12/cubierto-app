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
const app = (0, express_1.Router)();
const cola = {
    updatedAt: new Date(),
    personas: []
};
app.put('/cola/beneficiario/entrar/:usuarioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cola.personas.includes(req.params.usuarioId)) {
        cola.personas.push(req.params.usuarioId);
        cola.updatedAt = new Date();
    }
    const response = {
        message: "Un usuario ingreso a la cola",
        data: cola
    };
    res.json(response);
}));
app.put('/cola/beneficiario/salir/:usuarioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    cola.personas = cola.personas.filter(persona => persona !== req.params.usuarioId);
    cola.updatedAt = new Date();
    yield pusher_1.default.trigger("cola-channel", "beneficiario", cola);
    const response = {
        message: "Un usuario salio de la cola",
        data: cola
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=colaBeneficiario.js.map