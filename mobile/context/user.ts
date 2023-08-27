import { create } from "zustand";
import Usuario from "../interfaces/usuario";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { Venta } from "../interfaces/venta";
import { Ubicacion } from "../interfaces/ubicacion";

interface Properties {
  user: Usuario | null
}

interface Functions {
  setUser: (user: Usuario | null) => void
  logout: () => any
  addVenta: (newVenta: Venta) => void
  addUbicacion: (newUbicacion: Ubicacion) => void
}

export const useUser = create<Properties & Functions>((set) => {
  return {
    user: null,
    setUser: (user) => {
      set(old => ({...old, user }))
    },
    logout: async () => {
      await AsyncStorage.removeItem("user");
      router.replace("/login");
      set(old => ({...old, user: null }));
    },
    addVenta: (newVenta) => {
      set(old => {
        const user = old.user;
        if(user) {
          return {
            ...old,
            user: {
              ...user,
              ventas: [...user.ventas, newVenta]
            }
          }
        }
        return old;
      })
    },
    addUbicacion: (newUbicacion) => {
      set(old => {
        if(old.user) {
          return {
            ...old,
            user: {
              ...old.user,
              ubicaciones: [...old.user.ubicaciones, newUbicacion]
            }
          }
        }
        return old;
      });
    }
  }
})