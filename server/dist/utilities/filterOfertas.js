"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOfertas = void 0;
const filterOfertas = (ofertas) => {
    const ahora = new Date();
    return ofertas.filter(oferta => {
        const publicado = new Date(oferta.fecha);
        const milliseconds = ahora.getTime() - publicado.getTime();
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        return minutes < oferta.tiempo;
    });
};
exports.filterOfertas = filterOfertas;
//# sourceMappingURL=filterOfertas.js.map