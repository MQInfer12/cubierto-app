import { Donacion } from "@prisma/client";
export type CreateDonacionInput = Omit<Donacion, "id">;
export type UpdateDonacionInput = Partial<Donacion>;
