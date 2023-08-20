import { Producto } from "@prisma/client";
export type CreateProductoInput = Omit<Producto, "id">;
export type UpdateProductoInput = Partial<Producto>;