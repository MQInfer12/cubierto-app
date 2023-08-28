import { create } from "zustand";
import Usuario from "../interfaces/usuario";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { Venta } from "../interfaces/venta";
import { Ubicacion } from "../interfaces/ubicacion";
import { Favorito } from "../interfaces/favorito";

interface Properties {
  user: Usuario | null
}

interface Functions {
  setUser: (user: Usuario | null) => void
  logout: () => any
  addVenta: (newVenta: Venta) => void
  addUbicacion: (ubicacion: Ubicacion) => void
  removeUbicacion: (ubicacion: Ubicacion) => void
  addFavorito: (favorito: Favorito) => void
  removeFavorito: (favorito: Favorito) => void
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
    addUbicacion: (ubicacion) => {
      set(old => {
        if(old.user) {
          return {
            ...old,
            user: {
              ...old.user,
              ubicaciones: [...old.user.ubicaciones, ubicacion]
            }
          }
        }
        return old;
      });
    },
    removeUbicacion: (ubicacion) => {
      set(old => {
        if(old.user) {
          return {
            ...old,
            user: {
              ...old.user,
              ubicaciones: old.user.ubicaciones.filter(u => u.id !== ubicacion.id)
            }
          }
        }
        return old;
      })
    },
    addFavorito: (favorito) => {
      set(old => {
        if(old.user) {
          return {
            ...old,
            user: {
              ...old.user,
              favoritos: [...old.user.favoritos, favorito]
            }
          }
        }
        return old;
      });
    },
    removeFavorito: (favorito) => {
      set(old => {
        if(old.user) {
          return {
            ...old,
            user: {
              ...old.user,
              favoritos: old.user.favoritos.filter(f => f.id !== favorito.id)
            }
          }
        }
        return old;
      })
    }
  }
})