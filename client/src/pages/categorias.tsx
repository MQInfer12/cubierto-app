import { Section } from "../styles/compStyleDash"
import { useGet } from "../hook/useGet";
import { Categoria } from "../interfaces/categoria";
import Eliminar from "../assets/dash/delete.png";
import { sendRequest } from "../utilities/sendRequest";
import { useState } from 'react'
import toast from "react-hot-toast";
import { Divtabla } from "../styles/compStyle";
import { Skeleton } from "../styles/loading";

const Categorias = () => {
    const { res, getData } = useGet<Categoria[]>('categoria');
    const [form, setForm] = useState({
        nombre: "",
        ionicon: ""
    });
    const handleSave = async () => {

        if (form.nombre == "" && form.ionicon == "") {
            toast.error("Llenar los campos nombre y icono")
        }
        else if (form.nombre == "" && form.ionicon.length > 0) {
            toast.error("LLenar el campo nombre");
        }
        else if (form.ionicon == "" && form.nombre.length > 0) {
            toast.error("Llenar el campo icono");
        }
        else if (form.nombre.length > 0 && form.ionicon.length > 0) {
            const res = await sendRequest<Categoria>(`categoria`, {
                nombre: form.nombre,
                ionicon: form.ionicon
            });
            if (res) {
                toast.success(`Se Agrego categoria correctamente`);
                getData();
                setForm({ ionicon: "", nombre: "" })
            }
        }
    }
    const handleBorrar = async (id: number) => {
        const res = await sendRequest<Categoria>(
            `categoria/${id}`,
            null,
            {
                method: "DELETE",
            }
        );
        if (res) {
            setForm((old) => ({ ...old, ubicacion: undefined }));
            toast.success("Se elimino categoria");
            getData();
        }
    };
    return (
        <Section>
            <article>
                <p>Categorias</p>
            </article>
            <aside>

                <label htmlFor="">Nombre</label>
                <input type="text" onChange={(e) => setForm(old => ({ ...old, nombre: e.target.value }))} value={form.nombre} />
                <label htmlFor="">Icono</label>
                <input type="text" onChange={(e) => setForm(old => ({ ...old, ionicon: e.target.value }))} value={form.ionicon} />
                <a href="https://fontawesome.com/v5/search?o=r&m=free" target="_blank"> Ver iconos</a>
                <button onClick={handleSave}>Guardar</button>


            </aside>
            <Divtabla className="mini">

                <table>
                    <thead>
                        <tr>
                            <th className="min">Categoria</th>
                            <th></th>
                            <th className="mini">Icono</th>
                            <th className="mini">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !res ? <><tr>
                                <Skeleton colSpan={3} height={500}>
                                </Skeleton>

                            </tr>
                                <tr>
                                    <Skeleton colSpan={3} height={500}>
                                    </Skeleton>

                                </tr>
                                <tr>
                                    <Skeleton colSpan={3} height={500}>
                                    </Skeleton>

                                </tr></> : res?.data.map((categoria) => (
                                    <tr>
                                        <td colSpan={2} className="min">{categoria.nombre}</td>
                                        <td><i className={"fa-solid fa-" + categoria.ionicon}></i></td>
                                        <td><button onClick={() => handleBorrar(categoria.id)} className="buttonEliminar"><img src={Eliminar} alt="" /></button>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </Divtabla>
        </Section>
    )
}

export default Categorias
