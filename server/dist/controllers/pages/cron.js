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
const node_cron_1 = __importDefault(require("node-cron"));
const app = (0, express_1.Router)();
const checkInactiveBeneficiario = () => __awaiter(void 0, void 0, void 0, function* () {
    /* const ahora = new Date();
    const diff = ahora.getTime() - cola.updatedAt.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    if(minutes > 5) {
      cola.personas.shift();
      await pusher.trigger("cola-channel", "beneficiario", cola);
    } */
    console.log("Checking");
});
node_cron_1.default.schedule('*/1 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    yield checkInactiveBeneficiario();
}));
app.get('/cola/cron', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield checkInactiveBeneficiario();
}));
exports.default = app;
//# sourceMappingURL=cron.js.map