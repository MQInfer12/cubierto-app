import { useUser } from "../context/user";
import { Usuario } from "../interfaces/user";

export const UseLoggedUser = () => {
  const { user } = useUser();
  return user as Usuario;
}