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
const pusher_1 = __importDefault(require("../../utilities/pusher"));
const filterOfertas_1 = require("../../utilities/filterOfertas");
const app = (0, express_1.Router)();
setInterval(() => {
    console.log("Triggering");
}, 60000);
app.post('/cola/entrar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const existente = yield queries_1.default.cola.findUnique({
        where: {
            usuarioId: data.usuarioId
        }
    });
    if (!existente) {
        yield queries_1.default.cola.create({
            data: data,
            include: {
                usuario: true
            }
        });
    }
    const cola = yield queries_1.default.cola.findMany({
        where: {
            restauranteId: data.restauranteId
        }
    });
    const response = {
        message: "Ingresaste a la cola",
        data: cola
    };
    res.json(response);
}));
app.delete('/cola/salir/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const salio = yield queries_1.default.cola.delete({
        where: {
            id: Number(req.params.id)
        },
        include: {
            usuario: true
        }
    });
    const restauranteId = salio.restauranteId;
    //DATOS PARA ACTUALIZAR
    const cola = yield queries_1.default.cola.findMany({
        where: {
            restauranteId: restauranteId
        }
    });
    const productoActivos = (0, filterOfertas_1.filterOfertas)(yield queries_1.default.productoActivo.findMany({
        where: {
            producto: {
                usuarioId: restauranteId
            }
        }
    }));
    const response = {
        message: salio.usuario.nombre + " salió de la cola",
        data: {
            cola,
            productoActivos
        }
    };
    yield pusher_1.default.trigger("cola-channel", restauranteId, response);
    res.json(response);
}));
exports.default = app;
//# sourceMappingURL=cola.js.map