import { Ionicons } from '@expo/vector-icons'

type IconName = keyof typeof Ionicons.glyphMap

export interface Categoria {
  id: number;
  nombre: string;
  ionicon: IconName;
}