import { DetalleDonacion } from "@prisma/client";
export type CreateDetalleDonacionInput = Omit<DetalleDonacion, "id">;
export type UpdateDetalleDonacionInput = Partial<DetalleDonacion>;
