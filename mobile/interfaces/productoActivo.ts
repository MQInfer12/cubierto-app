import { DetalleVenta } from "./detalleVenta";
import { Producto } from "./producto";

export interface ProductoActivo {
  id: number;
  cantidad: number;
  precioDescontado: number;
  fecha: Date;
  tiempo: number;
  productoId: number;
  eliminado: boolean;
  producto: Producto;
  detalleVentas: DetalleVenta[];
}