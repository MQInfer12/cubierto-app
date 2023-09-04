import { Producto } from "./producto";

export interface DetalleDonacion {
  id: number;
  cantidad: number;
  donacionId: number;
  productoId: number;
  producto: Producto;
}