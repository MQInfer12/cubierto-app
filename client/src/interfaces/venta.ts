import { DetalleVenta } from "./detalleVenta";
import Usuario from "./usuario";

export type VentaEstado = "pendiente" | "aceptado" | "rechazado" | "sin respuesta" | "recogido";

export interface Venta {
  id: number;
  estado: VentaEstado;
  fecha: Date;
  usuarioId: string;
  detalles: DetalleVenta[];
  usuario: Usuario;
}