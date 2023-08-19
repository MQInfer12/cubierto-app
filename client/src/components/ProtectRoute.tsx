import { useUser } from "../context/useUser"
import { Navigate } from "react-router-dom"
interface Props {
    children: JSX.Element
}

const ProtectRoute = ({ children }: Props) => {
    const { user } = useUser();
    if (!user) {
        return <Navigate to={'/login'}></Navigate>;
    }
    return children;
}

export default ProtectRoute