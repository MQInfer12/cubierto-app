import { Ionicons } from '@expo/vector-icons'

type IconName = keyof typeof Ionicons.glyphMap

export interface Categoria {
  id: number | null;
  nombre: string;
  ionicon: IconName | string;
}