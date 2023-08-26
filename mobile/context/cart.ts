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
  emptyCart: () => void
}

export const useCart = create<Properties & Functions>((set) => {
  return {
    items: [],
    setNewItem: (newItem) => {
      set(old => {
        let newItems = [...old.items, newItem];
        const itemExiste = old.items.find(item => item.productoActivo.id === newItem.productoActivo.id);
        if(itemExiste) {
          newItems = old.items.map(item => {
            if(item.productoActivo.id === newItem.productoActivo.id) {
              item.cantidad += newItem.cantidad;
            }
            return item;
          });
        }
        return {
          ...old, 
          items: newItems
        }
      })
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
    },
    emptyCart: () => {
      set(old => ({
        ...old,
        items: []
      }))
    }
  }
})