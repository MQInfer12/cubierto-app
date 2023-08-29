import Usuario from "./usuario";

export interface Favorito {
  id: number;
  usuarioId: string;
  restauranteId: string;
  restaurante: Usuario;
}