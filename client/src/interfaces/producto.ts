import Usuario from "./usuario";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  precio: number;
  usuarioId: string;
  categoriaId: number;
  usuario: Usuario;
}