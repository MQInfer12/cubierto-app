import { useUser } from "../../../context/useUser";
import fotoA from "../../../assets/dash/logo_sinfondo.png";
const DatosNavDash = () => {
  const { user } = useUser();
  return (
      <section>
        <p><img src={fotoA} alt="" /></p>
        <img src={user?.foto} alt="perfil" />
        <h2>{user?.nombre}</h2>
        <h3>{user?.email}</h3>
      </section>
  );
};
export default DatosNavDash;
