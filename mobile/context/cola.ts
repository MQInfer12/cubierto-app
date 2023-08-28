import { create } from "zustand";
import { Cola } from "../interfaces/cola";

interface Properties {
  cola: Cola[] | null
  loadingSalir: boolean
  timer: number
}

interface Functions {
  cargarCola: (cola: Cola[]) => any
  vaciarCola: () => any
  setLoadingSalir: (newValue: boolean) => any
  resetTimer: () => any
  countTimer: () => any
}

const INITIAL_TIMER = 300;

export const useCola = create<Properties & Functions>((set) => {
  return {
    cola: null,
    loadingSalir: false,
    timer: INITIAL_TIMER,
    cargarCola: (cola) => set(old => ({...old, cola})),
    vaciarCola: () => set(old => ({...old, cola: null})),
    setLoadingSalir: (newValue) => set(old => ({...old, loadingSalir: newValue})),
    resetTimer: () => set(old => ({...old, timer: INITIAL_TIMER })),
    countTimer: () => set(old => ({...old, timer: old.timer - 1 }))
  }
});