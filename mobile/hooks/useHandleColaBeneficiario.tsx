import { useEffect, useState } from 'react'
import { sendRequest } from '../utilities/sendRequest';
import { useUser } from '../context/user';
import { channel } from '../pusher';
import { Cola } from '../interfaces/colaBeneficiario';

export const useHandleColaBeneficiario = () => {
  const { user } = useUser();
  const [cola, setCola] = useState<Cola | null>(null);

  useEffect(() => {
    const entrarCola = async() => {
      const res = await sendRequest<Cola>(`cola/beneficiario/entrar/${user?.id}`, null, {
        method: "PUT"
      });
      if(res) {
        setCola(res.data);
        channel.bind("beneficiario", (res: Cola) => {
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
    
    entrarCola();
    return () => {
      salirCola();
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
    myPos
  };
}