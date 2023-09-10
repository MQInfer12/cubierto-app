import * as ImagePicker from 'expo-image-picker';

export interface Form {
  foto: ImagePicker.ImagePickerAsset | undefined,
  portada: ImagePicker.ImagePickerAsset | undefined,
  nombre: string | undefined,
  descripcion: string | undefined,
  telefono: string
  ubicacion: number | undefined
}

export const validate = (form: Form) => {
  if(!form.nombre?.trim()) return "El nombre de usuario es requerido";
  return "";
}