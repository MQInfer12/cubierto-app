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
app.get('/pusherprueba', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    pusher_1.default.trigger("my-channel", "my-event", {
        message: "Hola mundo con Pusher!"
    });
    res.json("Se envio correctamente");
}));
exports.default = app;
//# sourceMappingURL=controller.js.map