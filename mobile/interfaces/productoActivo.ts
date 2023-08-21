import { Producto } from "./producto";

export interface ProductoActivo {
  id: number;
  cantidad: number;
  precioDescontado: number;
  fecha: Date;
  productoId: number;
  eliminado: boolean;
  producto: Producto;
}