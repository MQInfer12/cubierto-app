import { useEffect, useState } from "react";
import { useGet } from "../../hook/useGet";
import Usuario from "../../interfaces/usuario";
import { sendRequest } from "../../utilities/sendRequest";
import ver from"../../assets/dash/view.png";
import eliminar from"../../assets/dash/delete.png";
import edit from"../../assets/dash/edit-text.png";
import { Section } from "../../styles/compStyleDash";
const Usuarios = () => {
  const { res } = useGet<Usuario[]>("usuario");
  const [usuarios, setUsuarios] = useState<Usuario[] | undefined>(undefined);
  useEffect(() => {
    setUsuarios(res?.data);
  }, [res]);
  const handlenDelete = async (id: string) => {
    const res = await sendRequest<Usuario>(`usuario/${id}`, null, {
      method: "DELETE",
    });
    setUsuarios((anterior) =>
      anterior?.filter((usuario) => usuario.id !== res?.data.id)
    );
    alert(res?.message);
  };
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
    alert(res?.message);
  };
  return (
    <Section>
      <article>
        <p>Usuarios</p>
        <button>Agregar</button>
      </article>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((user) => (
        
              <tr key={user.id}>
                <td>
                  {" "}
                  <section>
                    <img src={user.foto} alt="foto usuario " />{" "}
                    <div>
                      <p>{user.nombre}</p>
                      <p>{user.email}</p>
                    </div>
                  </section>
                </td>
                <td>
                  {/* <select
                    defaultValue={user.rol}
                    onChange={(e) => handlenchangeRol(e, user.id)}
                  >
                    <option value="usuario">Usuario</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="proveedor">Proveedor</option>
                    <option value="beneficiario">Beneficiario</option>
                  </select> */}
                  <div>
                    <p>{user.rol}</p>
                    <p> {user.descripcion}</p>
                  </div>
                </td>
                <td>
                  <button>Activo</button>
                </td>
               <td>

               <article><img src={ver} alt="ver" />
                <img src={edit} alt="editar" />
                <img src={eliminar} alt="Eliminar" onClick={() => handlenDelete(user.id)} /></article>

               </td>
              </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default Usuarios;
 
