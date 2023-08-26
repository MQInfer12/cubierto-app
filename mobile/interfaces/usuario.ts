import { Producto } from "./producto";
import { Venta } from "./venta";

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
  productos: Producto[];
  ventas: Venta[];
}

export default Usuario;