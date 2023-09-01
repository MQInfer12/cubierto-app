import { Categoria } from "../categoria";
import { ProductoActivo } from "../productoActivo";

export interface PedirResponse {
  categorias: Categoria[],
  ofertas: ProductoActivo[]
}