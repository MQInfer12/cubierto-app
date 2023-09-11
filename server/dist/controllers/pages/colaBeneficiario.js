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
const node_cron_1 = __importDefault(require("node-cron"));
const app = (0, express_1.Router)();
const cola = {
    updatedAt: new Date(),
    personas: []
};
node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    cola.personas.push("a");
}));
app.put('/cola/beneficiario/entrar/:usuarioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cola.personas.includes(req.params.usuarioId)) {
        cola.personas.push(req.params.usuarioId);
    }
    if (cola.personas.length === 1) {
        cola.updatedAt = new Date();
    }
    const response = {
        message: "Un usuario ingreso a la cola",
        data: cola
    };
    res.json(response);
}));
app.put('/cola/beneficiario/salir/:usuarioId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (cola.personas[0] === req.params.usuarioId) {
        cola.updatedAt = new Date();
    }
    cola.personas = cola.personas.filter(persona => persona !== req.params.usuarioId);
    yield pusher_1.default.trigger("cola-channel", "beneficiario", cola);
    const response = {
        message: `Un usuario salio de la cola`,
        data: cola
    };
    res.json(response);
}));
app.get("/colabeneficiario", (req, res) => {
    res.json(cola);
});
exports.default = app;
//# sourceMappingURL=colaBeneficiario.js.map