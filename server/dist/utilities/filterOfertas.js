"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterVentas = exports.filterOfertas = void 0;
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
const filterVentas = (ventas, maxTime) => {
    const ahora = new Date();
    return ventas.filter(venta => {
        const fecha = new Date(venta.fecha);
        const milliseconds = ahora.getTime() - fecha.getTime();
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        return minutes < maxTime;
    });
};
exports.filterVentas = filterVentas;
//# sourceMappingURL=filterOfertas.js.map