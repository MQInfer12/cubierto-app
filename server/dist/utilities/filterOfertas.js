"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterDonaciones = exports.filterOfertas = void 0;
const filterOfertas = (productosActivos) => {
    const ahora = new Date();
    return productosActivos.filter(oferta => {
        const publicado = new Date(oferta.fecha);
        const milliseconds = ahora.getTime() - publicado.getTime();
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        return minutes < oferta.tiempo;
    });
};
exports.filterOfertas = filterOfertas;
const filterDonaciones = (productosActivos) => {
    const ahora = new Date();
    return productosActivos.filter(donacion => {
        const publicado = new Date(donacion.fecha);
        const milliseconds = ahora.getTime() - publicado.getTime();
        const seconds = milliseconds / 1000;
        const minutes = seconds / 60;
        return minutes > donacion.tiempo;
    });
};
exports.filterDonaciones = filterDonaciones;
//# sourceMappingURL=filterOfertas.js.map