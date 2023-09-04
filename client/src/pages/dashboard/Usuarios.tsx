import { useEffect, useState } from "react";
import { useGet } from "../../hook/useGet";
import Usuario from "../../interfaces/usuario";
import { Section } from "../../styles/compStyleDash";
import UsuarioFila from "../../components/usuarioFila";
import { Toaster } from 'react-hot-toast';
const Usuarios = () => {

  const { res } = useGet<Usuario[]>("usuario");
  const [usuarios, setUsuarios] = useState<Usuario[] | undefined>(undefined);
  useEffect(() => {
    setUsuarios(res?.data);
  }, [res]);

  return (
    <Section>
      <Toaster position="top-center" reverseOrder={false} />
      <article>
        <p>Usuarios</p>

      </article>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((user) => (
            <UsuarioFila key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </Section>
  );
};

export default Usuarios;

