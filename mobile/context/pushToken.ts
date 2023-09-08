import { create } from "zustand";

interface Properties {
  pushToken: string
}

interface Functions {
  setPushToken: (pushToken: string) => void
}

export const usePushToken = create<Properties & Functions>((set) => {
  return {
    pushToken: "",
    setPushToken: async (pushToken) => {
      set(old => ({...old, pushToken }))
    }
  }
})