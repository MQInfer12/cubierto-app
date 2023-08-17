export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  foto: string;
  rol: "usuario" | "restaurante" | "proveedor" | "beneficiario";
  notificaciones: "todas" | "favoritos";
  telefono: number;
  portada: string;
  descripcion: string;
  ubicacionActualId: number;
}

export type CreateUsuarioInput = Usuario;
export type UpdateUsuarioInput = Partial<Usuario>;