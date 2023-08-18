import { Favorito } from "@prisma/client";
export type CreateFavoritoInput = Omit<Favorito, "id">;
export type UpdateFavoritoInput = Partial<Favorito>;