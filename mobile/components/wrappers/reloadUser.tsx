import { useEffect, useState } from "react";
import { useUser } from "../../context/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendRequest } from "../../utilities/sendRequest";
import Usuario from "../../interfaces/usuario";
import { useGet } from "../../hooks/useGet";
import { useHandleCola } from "../../hooks/useHandleCola";

interface Props {
  children: JSX.Element | JSX.Element[] 
}

const ReloadUser = ({ children }: Props) => {
  const { user, setUser } = useUser();
  const { res } = useGet<Usuario>(`usuario/${user?.id}`);
  const { hacerCola } = useHandleCola();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getUserInfo = async () => {
      if(res) {
        setUser(res.data);
        if(res.data.cola) {
          await hacerCola(res.data.cola.restauranteId);
        }
        setLoaded(true);
      }
    }

    getUserInfo();
  }, [res]);

  useEffect(() => {
    const saveUser = async () => {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
    if(user) {
      saveUser();
    }
  }, [user]);

  if(!loaded) return null;
  return children;
}

export default ReloadUser;