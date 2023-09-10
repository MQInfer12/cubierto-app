export interface Form {
  nombre: string
  latitud: string
  longitud: string
}

export const validate = (form: Form) => {
  if(!form.nombre.trim()) return "La descripción es requerida";
  if(!form.latitud.trim()) return "La latitud es requerida";
  if(!form.longitud.trim()) return "La longitud es requerida";
  return "";
}