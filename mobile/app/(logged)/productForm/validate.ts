import * as ImagePicker from 'expo-image-picker';

export interface Form {
  foto: ImagePicker.ImagePickerAsset | null
  nombre: string
  descripcion: string
  precio: string
  categoriaId: string | null
}

export const validate = (form: Form, validateImgs: boolean) => {
  if(!form.foto && validateImgs) return "La foto es requerida";
  if(!form.nombre.trim()) return "El nombre es requerido";
  if(!form.descripcion.trim()) return "La descripción es requerida";
  if(form.precio === "") return "El precio es requerido";
  if(Number(form.precio) <= 0) return "El precio tiene que ser mayor que cero";
  return "";
}