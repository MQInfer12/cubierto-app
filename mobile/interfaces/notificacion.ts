import Usuario from "./usuario";

export interface Notificacion {
  id: number;
  ionicon: string;
  titulo: string;
  descripcion: string;
  route: string;
  usuarioId: string;
  usuarioDe: Usuario;
}