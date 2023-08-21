import { create } from "zustand";
import { ProductoActivo } from "../interfaces/productoActivo";

export interface CartItem {
  cantidad: number,
  productoActivo: ProductoActivo
}

interface Properties {
  items: CartItem[]
}

interface Functions {
  setNewItem: (newItem: CartItem) => void
}

export const useCart = create<Properties & Functions>((set) => {
  return {
    items: [],
    setNewItem: async (newItem) => {
      set(old => ({...old, items: [...old.items, newItem] }))
    }
  }
})