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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const app = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;
function signUp(code, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${BACKEND_URL}google&grant_type=authorization_code`;
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            const data = yield response.json();
            const verify = yield fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${data.id_token}`);
            if (verify.ok) {
                const userData = yield verify.json();
                const { sub, name, email, picture } = userData;
                let user = yield prisma.usuario.findUnique({
                    where: {
                        id: sub
                    }
                });
                if (!user) {
                    user = yield prisma.usuario.create({
                        data: {
                            id: sub,
                            nombre: name,
                            email: email,
                            foto: picture
                        }
                    });
                }
                res.send(`<script>window.location.replace("exp://192.168.0.29:8081?userId=${user.id}")</script>`);
            }
        }
    });
}
app.get("/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    if (code) {
        return res.status(400).json({
            error: "Código inválido"
        });
    }
    signUp(code, res);
}));
exports.default = app;
//# sourceMappingURL=auth.js.map