import { Cola } from "@prisma/client";
export type CreateColaInput = Omit<Cola, "id">;
export type UpdateColaInput = Partial<Cola>;
