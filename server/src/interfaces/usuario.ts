import { Usuario } from "@prisma/client";

export type CreateUsuarioInput = Usuario;
export type UpdateUsuarioInput = Partial<Usuario>;