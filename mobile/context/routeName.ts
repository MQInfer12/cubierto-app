import { create } from "zustand";
import { useEffect } from 'react';

interface Properties {
  route: string
}

interface Functions {
  setRoute: (route: string) => void
}

export const useRouteName = create<Properties & Functions>((set) => {
  return {
    route: "",
    setRoute: async (route) => {
      set(old => ({...old, route }))
    }
  }
})

export const useSetRouteName = (route: string) => {
  const { setRoute } = useRouteName();

  useEffect(() => {
    setRoute(route);
  }, []);
}