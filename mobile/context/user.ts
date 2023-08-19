import { create } from "zustand";
import Usuario from "../interfaces/usuario";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

interface Properties {
  user: Usuario | null
}

interface Functions {
  setUser: (user: Usuario | null) => any
  logout: () => any
}

export const useUser = create<Properties & Functions>((set) => {
  return {
    user: null,
    setUser: async (user) => {
      await AsyncStorage.setItem("user", JSON.stringify(user));
      set(old => ({...old, user }))
    },
    logout: async () => {
      await AsyncStorage.removeItem("user");
      router.replace("/login");
      set(old => ({...old, user: null }));
    }
  }
})