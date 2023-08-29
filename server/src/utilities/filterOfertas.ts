import { ProductoActivo } from "@prisma/client";

export const filterOfertas = (ofertas: ProductoActivo[]) => {
  const ahora = new Date();
  return ofertas.filter(oferta => {
    const publicado = new Date(oferta.fecha);
    const milliseconds = ahora.getTime() - publicado.getTime();
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    console.log(minutes);
    return minutes < oferta.tiempo;
  });
}