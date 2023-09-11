import { useEffect, useState } from 'react'
import { sendRequest } from '../utilities/sendRequest';
import { useUser } from '../context/user';
import { channel } from '../pusher';
import { Cola } from '../interfaces/colaBeneficiario';
import { Alert } from 'react-native';

export const useHandleColaBeneficiario = () => {
  const { user } = useUser();
  const [cola, setCola] = useState<Cola | null>(null);
  const [volverAIngresar, setVolverAIngresar] = useState(false);

  const entrarCola = async() => {
    const res = await sendRequest<Cola>(`cola/beneficiario/entrar/${user?.id}`, null, {
      method: "PUT"
    });
    if(res) {
      setVolverAIngresar(false);
      setCola(res.data);
      channel.bind("beneficiario", (res: Cola) => {
        const estoy = res.personas.find(persona => persona === user?.id);
        if(!estoy) {
          Alert.alert("Ya no estás en la cola...");
          setCola(null);
          channel.unbind("beneficiario");
          setVolverAIngresar(true);
        }
        setCola(res);
      });
    }
  }

  const salirCola = async() => {
    const res = await sendRequest<Cola>(`cola/beneficiario/salir/${user?.id}`, null, {
      method: "PUT"
    });
    if(res) {
      setCola(null);
      channel.unbind("beneficiario");
    }
  }

  useEffect(() => {
    entrarCola();
    return () => {
      if(cola) {
        salirCola();
      }
    }
  }, [])

  let myTurn = false;
  let myPos = 0;
  if(user && cola) {
    myTurn = cola.personas[0] === user.id;
    myPos = cola.personas.indexOf(user.id);
  }

  return {
    cola,
    myTurn,
    myPos,
    volverAIngresar,
    entrarCola,
    salirCola
  };
}