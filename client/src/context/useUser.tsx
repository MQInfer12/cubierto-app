import { create } from 'zustand';
import Usuario from '../interfaces/usuario';
interface Properties {
    user: Usuario | null
}

interface Functions {
    setUser: (user: Usuario | null) => any
    logout: () => any
}
export const useUser = create<Properties & Functions>((set) => {
    const localuser = JSON.parse(localStorage.getItem("user") || 'null');

    return {
        user: localuser,
        setUser: (user) => {
            localStorage.setItem("user", JSON.stringify(user));
            set(old => ({ ...old, user }))
        },
        logout: () => {
            localStorage.removeItem("user");
            set(old => ({ ...old, user: null }));
        }
    }
})