import { useState } from 'react';
import { Alert } from "react-native";
import { useCart } from "../context/cart";
import { useCola } from "../context/cola";
import { useUser } from "../context/user";
import { sendRequest } from "../utilities/sendRequest";
import { Cola } from "../interfaces/cola";
import { channel } from "../pusher";
import { ProductoActivo } from '../interfaces/productoActivo';

type ApiResponse<T> = {
  message: string, 
  data: T
}

interface SalirColaResponse {
  cola: Cola[]
  productoActivos: ProductoActivo[]
}

export const useHandleCola = (actualizarProducto?: (productos: ProductoActivo[]) => any) => {
  const { cola, vaciarCola, cargarCola, setLoadingSalir } = useCola();
  const { user } = useUser();
  const { emptyCart } = useCart();

  const hacerCola = async (restauranteId: string) => {
    const response = await sendRequest<Cola[]>(`cola/entrar`, {
      usuarioId: user?.id,
      restauranteId: restauranteId
    });
    if(response) {
      cargarCola(response.data);
      channel.bind(restauranteId, (res: ApiResponse<SalirColaResponse>) => {
        const estoy = res.data.cola.find(item => item.usuarioId === user?.id);
        if(!estoy) {
          Alert.alert("Ya no te encuentras en la cola");
          channel.unbind(restauranteId);
          vaciarCola();
          emptyCart();
          return;
        } 
        cargarCola(res.data.cola);
        if(actualizarProducto) {
          //FIXME: Ahora mismo estamos trayendo todos los productos activos del restaurante con sus respectivas ventas (esto se hace para calcular el total
          //de stock restante para cada producto y notificar cuando se acabe uno), estaba dando error en el maximo tamaño de petición en el pusher, 
          //es posible que vuelva a fallar si el restaurante tiene muchos productos activos y muchos usuarios comprando al mismo tiempo, 
          //para solucionarlo se necesitará calcular el máximo de productos a comprar de alguna otra manera
          actualizarProducto(res.data.productoActivos);
        }
      });
    }
  }

  const salirDeCola = async () => {
    if(!cola) return;
    const miCola = cola.find(lugar => lugar.usuarioId === user?.id);
    const restauranteId = cola[0].restauranteId;
    if(!miCola) return;
    setLoadingSalir(true);
    const response = await sendRequest(`cola/salir/${miCola.id}`, null, {
      method: "DELETE"
    });
    if(response) {
      channel.unbind(restauranteId);
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
    myTurn,
    myPlace,
    hacerCola,
    salirDeCola,
    handleSalirDeCola
  }
}