import { create } from "zustand";
import { Usuario } from "../interfaces/usuario";

interface Properties {
  user: Usuario | null
}

interface Functions {
  setUser: (user: Usuario | null) => any
}

export const useUser = create<Properties & Functions>(set => ({
  user: null,
  setUser: (user) => set(old => ({...old, user }))
}))