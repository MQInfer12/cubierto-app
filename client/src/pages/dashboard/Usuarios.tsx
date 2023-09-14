import { useEffect, useState } from "react";
import { useGet } from "../../hook/useGet";
import Usuario from "../../interfaces/usuario";
import { Section } from "../../styles/compStyleDash";
import UsuarioFila from "../../components/usuarioFila";
import { Divtabla } from "../../styles/compStyle";
const Usuarios = () => {
  const [filter, setFilter] = useState("");
  const { res } = useGet<Usuario[]>("usuario");
  const [usuarios, setUsuarios] = useState<Usuario[] | undefined>(undefined);
  useEffect(() => {
    setUsuarios(res?.data);
  }, [res]);

  return (
    <Section>
     
      <article>
        <p>Usuarios</p>
        <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </article>
      <Divtabla>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th className="pequeno">Rol</th>
              <th className="mini">Estado</th>
            </tr>
          </thead>
          <tbody>
            {usuarios?.filter((user)=>user.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((user) => (
              <UsuarioFila key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </Divtabla>
    </Section>
  );
};

export default Usuarios;

