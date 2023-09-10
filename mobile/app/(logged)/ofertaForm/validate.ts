export interface Form {
  productoId: string | null
  cantidad: string
  precioDescontado: string
  tiempo: string
}

export const validate = (form: Form, precioReal: number) => {
  if(!form.productoId) return "El producto es requerido";
  if(form.cantidad === "") return "La cantidad es requerida";
  if(Number(form.cantidad) <= 0) return "La cantidad tiene que ser mayor que cero";
  if(form.precioDescontado === "") return "El descuento es requerido";
  if(Number(form.precioDescontado) >= precioReal) return "El descuento tiene que ser menor al precio real";
  if(Number(form.precioDescontado) <= 0) return "El descuento tiene que ser mayor que cero";
  if(form.tiempo && Number(form.tiempo) <= 0) return "El tiempo tiene que ser mayor que cero";
  return "";
}