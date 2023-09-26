import { useEffect, useState } from "react";
import { useGet } from "../../hook/useGet";
import Usuario from "../../interfaces/usuario";
import { Inputfilter, Section } from "../../styles/compStyleDash";
import UsuarioFila from "../../components/usuarioFila";
import { Divtabla } from "../../styles/compStyle";
import { Skeleton } from "../../styles/loading";
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
        <div>
          <Inputfilter type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
          <i className="fas fa-search"></i>
        </div>
      </article>
      <Divtabla>
        <table>
          <thead>
            <tr>
              <th className="min">Nombre</th>
              <th></th>
              <th className="pequeno">Rol</th>
              <th className="mini">Estado</th>
            </tr>
          </thead>
          <tbody>
            {
              !res ? <>
                <tr>
                  <Skeleton colSpan={3} height={500} />
                </tr>
                <tr>
                  <Skeleton colSpan={3} height={500} />
                </tr>
                <tr>
                  <Skeleton colSpan={3} height={500} />
                </tr>
              </> :
                usuarios?.filter((user) => user.nombre.toLocaleLowerCase().includes(filter.toLocaleLowerCase())).map((user) => (
                  <UsuarioFila key={user.id} user={user} />
                ))}
          </tbody>
        </table>
      </Divtabla>
    </Section>
  );
};

export default Usuarios;

