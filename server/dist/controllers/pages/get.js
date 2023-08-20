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
app.get('/pedir', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categorias = yield queries_1.default.categoria.findMany();
    const ofertas = yield queries_1.default.productoActivo.findMany();
    const response = {
        message: "Datos obtenidos correctamente",
        data: {
            categorias,
            ofertas
        }
    };
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=get.js.map