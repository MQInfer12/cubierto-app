import { ProductoActivo } from "@prisma/client";
export type CreateProductoActivoInput = Omit<ProductoActivo, "id">;
export type UpdateProductoActivoInput = Partial<ProductoActivo>;