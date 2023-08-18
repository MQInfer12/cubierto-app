import { Ubicacion } from "@prisma/client";
export type CreateUbicacionInput = Omit<Ubicacion, "id">;
export type UpdateUbicacionInput = Partial<Ubicacion>;