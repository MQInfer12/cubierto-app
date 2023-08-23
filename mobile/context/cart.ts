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
  removeItem: (idItem: number) => void
  changeQuantity: (idItem: number, number: number) => void
}

export const useCart = create<Properties & Functions>((set) => {
  return {
    items: [],
    setNewItem: (newItem) => {
      set(old => ({...old, items: [...old.items, newItem] }))
    },
    removeItem: (idItem) => {
      set(old => ({...old, items: old.items.filter(item => item.productoActivo.id !== idItem)}))
    },
    changeQuantity: (idItem, number) => {
      set(old => ({
        ...old,
        items: old.items.map(item => {
          if(item.productoActivo.id === idItem) {
            item.cantidad += number;
          }
          return item;
        })
      }))
    }
  }
})