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
app.listen(port, () => {
    return console.log(`server is listening on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map