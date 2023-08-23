import { ProductoActivo, Usuario } from "@prisma/client";

export interface RestauranteResponse {
  restaurante: Usuario
  ofertasActivas: ProductoActivo[]
}