import { Categoria, ProductoActivo } from "@prisma/client";

export interface PedirResponse {
  categorias: Categoria[],
  ofertas: ProductoActivo[]
}