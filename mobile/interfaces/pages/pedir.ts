import { Categoria } from "../categoria";
import { Donacion } from "../donacion";
import { ProductoActivo } from "../productoActivo";

export interface PedirResponse {
  donacion: Donacion,
  categorias: Categoria[],
  ofertas: ProductoActivo[]
}