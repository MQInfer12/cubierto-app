import { create } from "zustand";
import { Cola } from "../interfaces/cola";

interface Properties {
  cola: Cola[] | null
  loadingSalir: boolean
}

interface Functions {
  cargarCola: (cola: Cola[]) => any
  vaciarCola: () => any
  setLoadingSalir: (newValue: boolean) => any
}

export const useCola = create<Properties & Functions>((set) => {
  return {
    cola: null,
    loadingSalir: false,
    cargarCola: (cola) => set(old => ({...old, cola})),
    vaciarCola: () => set(old => ({...old, cola: null})),
    setLoadingSalir: (newValue) => set(old => ({...old, loadingSalir: newValue}))
  }
});