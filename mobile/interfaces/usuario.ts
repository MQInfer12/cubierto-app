type Usuario = {
  id: string;
  nombre: string;
  email: string;
  foto: string;
  rol: "usuario" | "restaurante" | "proveedor" | "beneficiario" | "admin";
  notificaciones: "todas" | "favoritos";
  telefono: number;
  portada: string;
  descripcion: string;
  ubicacionActualId: number;
}

export default Usuario;