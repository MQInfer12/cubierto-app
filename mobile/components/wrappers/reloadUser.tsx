import { useEffect } from "react";
import { useUser } from "../../context/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendRequest } from "../../utilities/sendRequest";
import Usuario from "../../interfaces/usuario";
import { useGet } from "../../hooks/useGet";

interface Props {
  children: JSX.Element | JSX.Element[] 
}

const ReloadUser = ({ children }: Props) => {
  const { user, setUser } = useUser();
  const { res } = useGet<Usuario>(`usuario/${user?.id}`);

  useEffect(() => {
    if(res) {
      setUser(res.data);
    }
  }, [res]);

  useEffect(() => {
    const saveUser = async () => {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
    if(user) {
      saveUser();
    }
  }, [user]);

  return children;
}

export default ReloadUser;