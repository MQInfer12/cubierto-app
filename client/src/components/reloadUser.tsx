import { useState, useEffect } from "react"
import { useUser } from "../context/useUser"
import { useGet } from "../hook/useGet"
import Usuario from "../interfaces/usuario"
import styled from "styled-components"

interface Props {
    children: JSX.Element | JSX.Element[]
}
const ReloadUser = ({ children }: Props) => {
    const { user, setUser } = useUser();
    const { res } = useGet<Usuario>(`usuario/${user?.id}`);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const getUserInfo = async () => {
            if (res) {
                setUser(res.data);
                setLoaded(true);
            }
        }
        getUserInfo();
    }, [res]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);
    if (!loaded) return <Loading>Cargando...</Loading>;
    return children;
}

export default ReloadUser;

const Loading = styled.div`
    width: 100vw;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
`;