"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const usuario_1 = __importDefault(require("./controllers/usuario"));
const auth_1 = __importDefault(require("./controllers/auth"));
const producto_1 = __importDefault(require("./controllers/producto"));
const ubicacion_1 = __importDefault(require("./controllers/ubicacion"));
const productoActivo_1 = __importDefault(require("./controllers/productoActivo"));
const venta_1 = __importDefault(require("./controllers/venta"));
const detalleVenta_1 = __importDefault(require("./controllers/detalleVenta"));
const donacion_1 = __importDefault(require("./controllers/donacion"));
const detalleDonacion_1 = __importDefault(require("./controllers/detalleDonacion"));
const favorito_1 = __importDefault(require("./controllers/favorito"));
const app = (0, express_1.default)();
const port = 3000;
dotenv_1.default.config();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('¡CUBIERTO Backend!');
});
app.use(usuario_1.default);
app.use(auth_1.default);
app.use(producto_1.default);
app.use(ubicacion_1.default);
app.use(productoActivo_1.default);
app.use(venta_1.default);
app.use(detalleVenta_1.default);
app.use(donacion_1.default);
app.use(detalleDonacion_1.default);
app.use(favorito_1.default);
app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map