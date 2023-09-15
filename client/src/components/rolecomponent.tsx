import toast from 'react-hot-toast';
import { useLoggedUser } from '../hook/useLoggedUser';
import { useNavigate } from 'react-router-dom';
interface Props {
    children: string | JSX.Element | JSX.Element[]
    roles: ("usuario" | "restaurante" | "proveedor" | "beneficiario" | "admin")[];
}
const Rolecomponent = ({ children, roles }: Props) => {
  
    const { rol } = useLoggedUser();
    
    if (roles.includes(rol)) {
        return children;
    }
    else {
        return null;
    }
}

export default Rolecomponent