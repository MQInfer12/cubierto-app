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
const signUp = (code, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("CLIENT_ID", CLIENT_ID);
    console.log("CLIENT_SECRET", CLIENT_SECRET);
    console.log("BACKEND_URL", BACKEND_URL);
    try {
        const url = `https://oauth2.googleapis.com/token?code=${code}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=${BACKEND_URL}google&state=1234_purpleGoogle&grant_type=authorization_code`;
        console.log("url", url);
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const responseJson = yield response.json();
        console.log("response", responseJson);
        if (response.ok) {
            const data = yield response.json();
            const verify = yield fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${data.id_token}`);
            const verifyJson = yield response.json();
            console.log("verify", verifyJson);
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
                console.log("user", user);
                res.send(`<script>window.location.replace("exp://192.168.0.29:8081?userId=${sub}")</script>`);
            }
        }
    }
    catch (e) {
        res.json({
            error: "¡Ocurrió un error inesperado, inténtalo de nuevo!"
        });
    }
});
app.get("/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    if (!code) {
        return res.status(400).json({
            error: "Código inválido"
        });
    }
    console.log("code", code);
    signUp(code, res);
}));
exports.default = app;
//# sourceMappingURL=auth.js.map