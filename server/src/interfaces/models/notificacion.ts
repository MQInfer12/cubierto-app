import { Notificacion } from "@prisma/client";
export type CreateNotificacionInput = Omit<Notificacion, "id">;
export type UpdateNotificacionInput = Partial<Notificacion>;