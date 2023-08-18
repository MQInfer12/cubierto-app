import { Categoria } from "@prisma/client";
export type CreateCategoriaInput = Omit<Categoria, "id">;
export type UpdateCategoriaInput = Partial<Categoria>;
