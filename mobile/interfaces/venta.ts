import { DetalleVenta } from "./detalleVenta";

export interface Venta {
  id: number;
  estado: "pendiente" | "aceptado" | "rechazado" | "sin respuesta";
  fecha: Date;
  usuarioId: string;
  detalles: DetalleVenta[];
}