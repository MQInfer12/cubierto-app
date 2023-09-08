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
exports.notifyNuevoPedido = exports.notifyNuevaOferta = exports.sendPushNotification = void 0;
const queries_1 = __importDefault(require("../middlewares/queries"));
function sendPushNotification(body) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    });
}
exports.sendPushNotification = sendPushNotification;
function notifyNuevaOferta(productoActivo) {
    return __awaiter(this, void 0, void 0, function* () {
        const usersToNotify = yield queries_1.default.usuario.findMany({
            where: {
                pushToken: {
                    not: null
                },
            },
            distinct: ['pushToken']
        });
        yield sendPushNotification(usersToNotify.map(user => ({
            to: user.pushToken,
            sound: "default",
            title: `¡Nueva oferta de ${productoActivo.producto.usuario.nombre}!`,
            body: `${productoActivo.producto.nombre} a tan solo Bs. ${productoActivo.precioDescontado}, ¡Aprovecha ahora mismo!`,
            data: {
                route: `verOferta/${productoActivo.id}`
            }
        })));
    });
}
exports.notifyNuevaOferta = notifyNuevaOferta;
function notifyNuevoPedido(idRestaurante) {
    return __awaiter(this, void 0, void 0, function* () {
        const userToNotify = yield queries_1.default.usuario.findUnique({
            where: {
                id: idRestaurante
            }
        });
        yield sendPushNotification({
            to: userToNotify.pushToken,
            sound: "default",
            title: `¡Tienes un nuevo pedido!`,
            body: `Haz click aquí para ver los detalles y aceptarlo`,
            data: {
                route: `cart/pendientes`
            }
        });
    });
}
exports.notifyNuevoPedido = notifyNuevoPedido;
//# sourceMappingURL=notifications.js.map