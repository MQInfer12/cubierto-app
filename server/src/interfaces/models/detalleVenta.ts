import { DetalleVenta } from "@prisma/client";
export type CreateDetalleVentaInput = Omit<DetalleVenta, "id">;
export type UpdateDetalleVentaInput = Partial<DetalleVenta>;
