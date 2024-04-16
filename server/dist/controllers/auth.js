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
const getParamsStr_1 = require("../utilities/getParamsStr");
const app = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const checkGoogleUserId = (googleUser) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("llega aqui", googleUser);
    let user = yield prisma.usuario.findUnique({
        where: {
            id: googleUser.sub,
        },
    });
    if (!user) {
        user = yield prisma.usuario.create({
            data: {
                id: googleUser.sub,
                nombre: googleUser.name,
                email: googleUser.email,
                foto: googleUser.picture,
            },
        });
    }
    return user;
});
const signUp = (code, appUrl, res) => __awaiter(void 0, void 0, void 0, function* () {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const BACKEND_URL = process.env.BACKEND_URL;
    try {
        const baseUrl = "https://oauth2.googleapis.com/token";
        const params = {
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: BACKEND_URL + "google",
            state: "1234_purpleGoogle",
            prompt: "consent",
            grant_type: "authorization_code",
        };
        const url = baseUrl + (0, getParamsStr_1.getParamsStr)(params);
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = yield response.json();
            const verify = yield fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${data.id_token}`);
            if (verify.ok) {
                const userData = yield verify.json();
                const googleUser = userData;
                const user = yield checkGoogleUserId(googleUser);
                console.log(`Sending script to ${appUrl}`);
                res.send(`<script>window.location.replace("${appUrl}?userId=${user.id}")</script>`);
            }
        }
        else {
            res.json({
                error: "¡Ocurrió un error inesperado, inténtalo de nuevo!",
                data: yield response.json(),
            });
        }
    }
    catch (e) {
        res.json({
            error: "¡Ocurrió un error inesperado, inténtalo de nuevo!",
            data: JSON.stringify(e),
        });
    }
});
app.get("/google", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, state: appUrl } = req.query;
    if (!code) {
        return res.status(400).json({
            error: "Código inválido",
        });
    }
    signUp(code, appUrl, res);
}));
app.post("/google/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const credential = req.body.credential;
    try {
        const resUserData = yield fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${credential}`);
        if (resUserData.ok) {
            const userData = yield resUserData.json();
            const user = yield checkGoogleUserId(userData);
            const response = {
                message: "Datos del usuario encontrados correctamente",
                data: user,
            };
            res.json(response);
        }
    }
    catch (e) {
        res.json({
            error: "¡Ocurrió un error inesperado, inténtalo de nuevo!",
        });
    }
}));
exports.default = app;
//# sourceMappingURL=auth.js.map