import { useUser } from "../context/useUser"
import { Navigate } from "react-router-dom"
import ReloadUser from "./reloadUser"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
interface Props {
    children: JSX.Element
}

const ProtectRoute = ({ children }: Props) => {
    const [load, setLoad] = useState(false);
    const { user } = useUser();
    const Navigate = useNavigate();


    useEffect(() => {
        if (!user) {
            Navigate("/login");
        }
        if (user?.rol == "usuario" || user?.rol == "beneficiario") {
            toast.success("Descarga la aplicacion para disfrutar de nuestras funcionalidades");
            Navigate("/");

        }
       
        setLoad(true);
    }, [])
    if (!load) {
        return null;
    }
    return <ReloadUser>
        {children}
    </ReloadUser>;
}

export default ProtectRoute