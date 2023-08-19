import { useUser } from "../context/user";
import Usuario from "../interfaces/usuario";

export const UseLoggedUser = () => {
  const { user } = useUser();
  return user as Usuario;
}