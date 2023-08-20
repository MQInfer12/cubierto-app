import { Venta } from "@prisma/client";
export type CreateVentaInput = Omit<Venta, "id">;
export type UpdateVentaInput = Partial<Venta>;
