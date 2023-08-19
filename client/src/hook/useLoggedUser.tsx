import { useUser } from "../context/useUser"
import Usuario from "../interfaces/usuario";
export const useLoggedUser = () => {
    const { user } = useUser();
    return user as Usuario;
}