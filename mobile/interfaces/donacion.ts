import { DetalleDonacion } from "./detalleDonacion";
import Usuario from "./usuario";

export type DonacionEstado = "pendiente" | "aceptado"; 

export interface Donacion {
  id: number;
  estadoBeneficiario: DonacionEstado;
  estadoDonador: DonacionEstado;
  fecha: Date;
  donadorId: string;
  beneficiarioId: string;
  detalles: DetalleDonacion[];
  donador: Usuario;
  beneficiario: Usuario;
}