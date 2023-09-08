import { Producto, ProductoActivo } from "@prisma/client";

export interface ItemCarrito {
  cantidad: number,
  productoActivo: ProductoActivo & {
    producto: Producto
  }
}

export interface LikeTo {
  restauranteId: string
  usuarioId: string
  favoritoId: number | null
}

export interface ItemCarritoRestaurante {
  cantidad: number
  producto: Producto
}

export interface CarritoBeneficiario {
  donadorId: string,
  items: ItemCarrito[]
}

export interface CarritoRestaurante {
  beneficiarioId: string,
  items: ItemCarritoRestaurante[]
}