import { create } from 'zustand';
import Usuario from '../interfaces/usuario';
import { Ubicacion } from '../interfaces/ubicacion';
interface Properties {
    user: Usuario | null
}

interface Functions {
    setUser: (user: Usuario | null) => any
    logout: () => any
    addUbicacion: (ubicacion: Ubicacion) => void
    removeUbicacion: (ubicacion: Ubicacion) => void

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
        },


        addUbicacion: (ubicacion) => {
            set(old => {
                if (old.user) {
                    return {
                        ...old,
                        user: {
                            ...old.user,
                            ubicaciones: [...old.user.ubicaciones, ubicacion]
                        }
                    }
                }
                return old;
            });
        },
        removeUbicacion: (ubicacion) => {
            set(old => {
                if (old.user) {
                    return {
                        ...old,
                        user: {
                            ...old.user,
                            ubicaciones: old.user.ubicaciones.filter(u => u.id !== ubicacion.id)
                        }
                    }
                }
                return old;
            });
        },
    }
})