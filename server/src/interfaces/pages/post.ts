import { ProductoActivo } from "@prisma/client";

export interface ItemCarrito {
  cantidad: number,
  productoActivo: ProductoActivo
}