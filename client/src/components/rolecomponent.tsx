import React from 'react'
import { useUser } from '../context/useUser';
import { useLoggedUser } from '../hook/useLoggedUser';
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