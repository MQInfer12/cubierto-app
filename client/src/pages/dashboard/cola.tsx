import { Section } from "../../styles/compStyleDash";
import { useUser } from "../../context/useUser";
import { useGet } from "../../hook/useGet";
import Usuario from "../../interfaces/usuario";
import { sendRequest } from "../../utilities/sendRequest";
import toast from "react-hot-toast";
import { Divtabla } from "../../styles/compStyle";
const Cola = () => {
    const { user } = useUser();
    const { res, getData } = useGet<Usuario[]>(user?.rol == 'admin' ? 'cola/beneficiario' : `cola/restaurante/${user?.id}`);
    
    const handleSave = async () => {

        const res = await sendRequest(user?.rol == "admin" ? `cola/beneficiario/expulsarprimero` : `cola/restaurante/vaciar/${user?.id}`,
            null, { method: 'PUT' })
        if (res) {
            toast.success(res.message);
            getData();
        }
    }
    const handleSacar = async (id: string | number) => {
        const res = await sendRequest(user?.rol == "admin" ? `cola/beneficiario/salir/${id}` : `cola/salir/${id}`,
            null, { method: 'DELETE' })
        if (res) {
            toast.success(res.message);
            getData();
        }
    }
    return (

        <Section>
           
            <article>
                <p>{user?.rol == "admin" ? "Cola de donaciones" : "Cola para pedidos"
                }</p>
                <button onClick={handleSave}>
                    {user?.rol == "admin" ? "Refrescar" : "Vaciar"}
                </button>
            </article>
           
                    <Divtabla>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th className="mini">Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    res?.data.map((usuario) => (
                                        <tr>
                                            <td>
                                                <section>
                                                    <img src={usuario.foto} alt="foto usuario " />
                                                    <div>
                                                        <p>{usuario.nombre}</p>
                                                        <p>{usuario.email}</p>
                                                    </div>
                                                </section>
                                            </td>
                                            <td>
                                                <button onClick={() => handleSacar(user?.rol == "admin" ? usuario.id : usuario.colaId)}>Sacar</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </Divtabla>
            

        </Section>
    )
}

export default Cola