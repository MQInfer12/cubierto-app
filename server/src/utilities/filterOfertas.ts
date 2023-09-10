import { ProductoActivo } from "@prisma/client";

export const filterOfertas = (productosActivos: ProductoActivo[]) => {
  const ahora = new Date();
  return productosActivos.filter(oferta => {
    const publicado = new Date(oferta.fecha);
    const milliseconds = ahora.getTime() - publicado.getTime();
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    return minutes < oferta.tiempo;
  });
}

export const filterDonaciones = (productosActivos: ProductoActivo[]) => {
  const ahora = new Date();
  return productosActivos.filter(donacion => {
    const publicado = new Date(donacion.fecha);
    const milliseconds = ahora.getTime() - publicado.getTime();
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    return minutes > donacion.tiempo;
  });
}