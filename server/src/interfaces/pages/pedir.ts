import { Categoria, Donacion, ProductoActivo } from "@prisma/client";

export interface PedirResponse {
  donacion: Donacion,
  categorias: Categoria[],
  ofertas: ProductoActivo[]
}