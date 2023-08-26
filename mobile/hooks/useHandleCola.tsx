import { useState } from 'react';
import { Alert } from "react-native";
import { useCart } from "../context/cart";
import { useCola } from "../context/cola";
import { useUser } from "../context/user";
import { sendRequest } from "../utilities/sendRequest";
import { Cola } from "../interfaces/cola";
import { channel } from "../pusher";

type ApiResponse<T> = {
  message: string, 
  data: T
}

export const useHandleCola = () => {
  const { cola, vaciarCola, cargarCola } = useCola();
  const { user } = useUser();
  const { emptyCart } = useCart();
  const [loadingSalir, setLoadingSalir] = useState(false);

  const hacerCola = async (restauranteId: string) => {
    const response = await sendRequest<Cola[]>(`cola/entrar`, {
      usuarioId: user?.id,
      restauranteId: restauranteId
    });
    if(response) {
      cargarCola(response.data);
      channel.bind("salir", (res: ApiResponse<Cola[]>) => {
        cargarCola(res.data);
      })
    }
  }

  const salirDeCola = async () => {
    if(!cola) return;
    const miCola = cola.find(lugar => lugar.usuarioId === user?.id);
    if(!miCola) return;
    setLoadingSalir(true);
    const response = await sendRequest(`cola/salir/${miCola.id}`, null, {
      method: "DELETE"
    });
    if(response) {
      channel.unbind("salir");
      vaciarCola();
      emptyCart();
    }
    setLoadingSalir(false);
  }

  const myPlace = cola && (cola.findIndex(lugar => lugar.usuarioId === user?.id) + 1);
  const myTurn = !!myPlace && myPlace === 1;

  const handleSalirDeCola = () => {
    Alert.alert("¿Quieres salir de la cola?", 
      myTurn ? "Es tu turno de pedir y se vaciará tu carrito" : "Perderás el lugar en la cola", [{
      text: "Cancelar",
      onPress: () => {
        return;
      },
      style: "cancel"
    }, {
      text: "Continuar",
      onPress: salirDeCola
    }])
  }


  return {
    loadingSalir,
    myTurn,
    myPlace,
    hacerCola,
    salirDeCola,
    handleSalirDeCola
  }
}