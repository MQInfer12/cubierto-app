import { ProductoActivo } from "./productoActivo";

export interface DetalleVenta {
  id: number;
  precioUnitario: number;
  cantidad: number;
  productoActivoId: number;
  ventaId: number;
  productoActivo: ProductoActivo;
}