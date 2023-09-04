import { Categoria } from "../categoria"
import { ProductoActivo } from "../productoActivo"
import Usuario from "../usuario"

export interface RestauranteResponse {
  restaurante: Usuario
  ofertasActivas: ProductoActivo[]
  categorias: Categoria[]
}