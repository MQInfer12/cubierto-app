import { Producto, ProductoActivo } from "@prisma/client";

export interface ItemCarrito {
  cantidad: number,
  productoActivo: ProductoActivo & {
    producto: Producto
  }
}

export interface CarritoBeneficiario {
  donadorId: string,
  items: ItemCarrito[]
}