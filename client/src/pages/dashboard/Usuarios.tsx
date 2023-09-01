import { useEffect, useState } from "react";
import { useGet } from "../../hook/useGet";
import Usuario from "../../interfaces/usuario";

import { sendRequest } from "../../utilities/sendRequest";

const Usuarios = () => {
    const { res } = useGet<Usuario[]>('usuario');
    const [usuarios, setUsuarios] = useState<Usuario[] | undefined>(undefined);
    useEffect(() => {
        setUsuarios(res?.data);
    }, [res])
    const handlenDelete = async (id: string) => {
        const res = await sendRequest<Usuario>(`usuario/${id}`, null, {
            method: "DELETE"
        })
        setUsuarios(anterior => (
            anterior?.filter(usuario => usuario.id !== res?.data.id)
        ));
        alert(res?.message)
    }
    const handlenchangeRol = async (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        const res = await sendRequest(`usuario/${id}`, { rol: e.target.value }, {
            method: "PUT"
        })
        alert(res?.message);
    }
    return (
        <div style={{ paddingLeft: "calc(210px + 3rem)" }}>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios?.map((user) => (
                            <>
                                <tr key={user.id}>
                                    <th> {user.nombre}</th>
                                    <th><select defaultValue={user.rol} onChange={(e) => handlenchangeRol(e, user.id)}>
                                        <option value="usuario">Usuario</option>
                                        <option value="restaurante">Restaurante</option>
                                        <option value="proveedor">Proveedor</option>
                                        <option value="beneficiario">Beneficiario</option>
                                    </select></th>
                                    <button onClick={() => handlenDelete(user.id)}>Eliminar</button>
                                </tr>
                            </>
                        )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Usuarios