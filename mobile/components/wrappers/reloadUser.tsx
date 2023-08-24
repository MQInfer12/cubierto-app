import { useEffect } from "react";
import { useUser } from "../../context/user";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  children: JSX.Element | JSX.Element[] 
}

const ReloadUser = ({ children }: Props) => {
  const { user } = useUser();

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