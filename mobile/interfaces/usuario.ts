import { Cola } from "./cola";
import { Favorito } from "./favorito";
import { Producto } from "./producto";
import { Ubicacion } from "./ubicacion";

export type UserRol = "usuario" | "restaurante" | "proveedor" | "beneficiario" | "admin";

type Usuario = {
  id: string;
  nombre: string;
  email: string;
  foto: string;
  rol: UserRol;
  notificaciones: "todas" | "favoritos";
  telefono: number;
  portada: string;
  descripcion: string;
  ubicacionActualId: number;
  pushToken: string;
  productos: Producto[];
  cola: Cola;
  ubicaciones: Ubicacion[];
  ubicacionActual: Ubicacion;
  favoritos: Favorito[];
}

export default Usuario;