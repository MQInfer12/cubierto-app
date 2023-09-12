import { Section } from "../styles/compStyleDash"
import { useGet } from "../hook/useGet";
import { Categoria } from "../interfaces/categoria";
import Eliminar from "../assets/dash/delete.png";
import { sendRequest } from "../utilities/sendRequest";
import { useState } from 'react'
import toast, { Toast, Toaster } from "react-hot-toast";
const Categorias = () => {
    const [nuevoCategoria, setNuevaCategoria] = useState(false);
    const { res } = useGet<Categoria[]>('categoria');
    const [form, setForm] = useState({
        nombre: "",
        ionicon: ""
    });
    const handleSave = async () => {
        const res = await sendRequest<Categoria>(`categoria`, {
            nombre: form.nombre,
            ionicon: form.ionicon
        });
        if (res) {
            toast.success(`Se Agrego categoria correctamente`);
            setNuevaCategoria(!nuevoCategoria);
            
        }
    }
    const handleBorrar = async (id:number) => {
        const res = await sendRequest<Categoria>(
            `categoria/${id}`,
            null,
            {
                method: "DELETE",
            }
        );
        if (res) {
            setForm((old) => ({ ...old, ubicacion: undefined }));
        toast.error("Se elimino categoria");
        }
    };

    return (
        <Section>
            <Toaster position="top-center" reverseOrder={false} />

            <article>
                <p>Categorias</p>
            </article>
          <aside>
          {!nuevoCategoria ? <></> : <><label htmlFor="">Nombre</label>
                <input type="text" onChange={(e) => setForm(old => ({ ...old, nombre: e.target.value }))} value={form.nombre} />
                <label htmlFor="">Icono</label>
                <input type="text" onChange={(e) => setForm(old => ({ ...old, ionicon: e.target.value }))} value={form.ionicon} />
                <button onClick={handleSave}>Guardar</button>
            </>}
            <button onClick={() => {
                setNuevaCategoria(!nuevoCategoria);
            }}>
                {!nuevoCategoria ? <> <i className="fa-regular fa-square-plus"></i></> : <><i className="fa-solid fa-circle-up"></i></>}
            </button>
          </aside>

            <table>
                <thead>
                    <tr>
                        <th>Categoria</th>
                        <th>Icono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        res?.data.map((categoria) => (
                            <tr>
                                <td>{categoria.nombre}</td>
                                <td><i className={categoria.ionicon}></i></td>
                                <td><button onClick={()=>handleBorrar(categoria.id)}><img src={Eliminar} alt="" /></button>
                                </td>
                            </tr>

                        ))
                    }
                </tbody>
            </table>
        </Section>
    )
}

export default Categorias
