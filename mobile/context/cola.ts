import { create } from "zustand";
import { Cola } from "../interfaces/cola";

interface Properties {
  cola: Cola[] | null
}

interface Functions {
  cargarCola: (cola: Cola[]) => any
  vaciarCola: () => any
}

export const useCola = create<Properties & Functions>((set) => {
  return {
    cola: null,
    cargarCola: (cola) => set(old => ({...old, cola})),
    vaciarCola: () => set(old => ({...old, cola: null}))
  }
});