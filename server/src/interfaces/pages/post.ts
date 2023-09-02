import { ProductoActivo } from "@prisma/client";

export interface ItemCarrito {
  cantidad: number,
  productoActivo: ProductoActivo
}

export interface CarritoBeneficiario {
  donadorId: string,
  items: ItemCarrito[]
}