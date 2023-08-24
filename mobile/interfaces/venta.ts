import { DetalleVenta } from "./detalleVenta";

export interface Venta {
  id: number;
  estado: "pendiente" | "aceptado" | "rechazado";
  fecha: Date;
  usuarioId: string;
  detalles: DetalleVenta[];
}