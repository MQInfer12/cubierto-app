import { useEffect } from "react"
import { useCola } from "../context/cola";
import { router } from "expo-router";

export const useProtectCola = () => {
  const { cola } = useCola();

  useEffect(() => {
    if(cola) {
      const idRestaurante = cola[0].restauranteId;
      router.push(`/restaurante/${idRestaurante}`)
    }
  }, []);
}