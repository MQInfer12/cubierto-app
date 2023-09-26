

import Usuario from "../interfaces/usuario"
import { sendRequest } from "../utilities/sendRequest"
import { useState } from 'react'
import toast from "react-hot-toast"

interface Props {
    user: Usuario
}
const UsuarioFila = ({ user }: Props) => {
    const [estado, setEstado] = useState(user.eliminado);
    const handlenchangeEstado = async (
    ) => {
        const res = await sendRequest<Usuario>(
            `usuario/${user.id}`,
            { eliminado: !estado },
            {
                method: "PUT",
            }
        );
        if (res) {
            toast.success(`Se ${estado ? 'activo':'deshabilitado'} correctamente!`);
            setEstado(res.data.eliminado);
        }
    }

    const handlenchangeRol = async (
        e: React.ChangeEvent<HTMLSelectElement>,
        id: string
    ) => {
        const res = await sendRequest(
            `usuario/${id}`,
            { rol: e.target.value },
            {
                method: "PUT",
            }
        );
        toast.success(`Se cambio a ${e.target.value} correctamente!`);
    };
   
    return (
        <>
            <tr>
                <td colSpan={2} className="min">
                    <section>
                        <img src={user.foto} alt="foto usuario " />{" "}
                        <div>
                            <p>
                                
                                {user.nombre}</p>
                            <p>{user.email}</p>
                        </div>
                    </section>
                </td>
                <td>
                    <select
                        defaultValue={user.rol}
                        onChange={(e) => handlenchangeRol(e, user.id)}
                        disabled={user.rol == "admin"}
                    >
                        <option value="usuario">Usuario</option>
                        <option value="restaurante">Restaurante</option>
                        <option value="proveedor">Proveedor</option>
                        <option value="beneficiario">Beneficiario</option>
                        <option value="admin" disabled>Administrador</option>
                    </select>
                    <div>
                    </div>
                </td>
                <td>
                    <button onClick={handlenchangeEstado} style={{
                        backgroundColor: estado ? "#E75854" : "rgba(24, 201, 100, 0.2)",
                        color: estado ? "#E4EAF1" : "#18C964",
                    }}

                    >{estado ? "Deshabilitado" : "Activo"}</button>
                </td>

            </tr>
        </>
    )
}

export default UsuarioFila