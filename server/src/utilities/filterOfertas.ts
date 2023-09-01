import { ProductoActivo, Venta } from "@prisma/client";

export const filterOfertas = (ofertas: ProductoActivo[]) => {
  const ahora = new Date();
  return ofertas.filter(oferta => {
    const publicado = new Date(oferta.fecha);
    const milliseconds = ahora.getTime() - publicado.getTime();
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    return minutes < oferta.tiempo;
  });
}

export const filterVentas = (ventas: Venta[], maxTime: number) => {
  const ahora = new Date();
  return ventas.filter(venta => {
    const fecha = new Date(venta.fecha);
    const milliseconds = ahora.getTime() - fecha.getTime();
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    return minutes < maxTime;
  })
} 