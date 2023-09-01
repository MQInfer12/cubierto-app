
import { useUser } from '../context/useUser';
import { useLoggedUser } from '../hook/useLoggedUser';
import { Navigate } from 'react-router-dom';
interface Props {
    children: string | JSX.Element | JSX.Element[]
    roles: ("usuario" | "restaurante" | "proveedor" | "beneficiario" | "admin")[];
}
const RoleRoute = ({ children, roles }: Props) => {
    const { rol } = useLoggedUser();
    if (roles.includes(rol)) {
        return children;
    }
    else {
        return <Navigate to={'/dashboard'}></Navigate>;
    }
}

export default RoleRoute