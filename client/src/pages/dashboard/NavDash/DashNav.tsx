import { Dash, Linkdash, NavDash } from "../../../styles/compStyleDash";
import prom from "../../../assets/dash/promociones.svg";
import fav from "../../../assets/dash/favoritos.svg";
import pedidos from "../../../assets/dash/pedidos.svg";
import perfil from "../../../assets/dash/perfil.svg";
import secion from "../../../assets/dash/secion.svg";
import { Outlet } from "react-router-dom";
import { useUser } from "../../../context/useUser";
import Rolecomponent from "../../../components/rolecomponent";
const Dashnav = ({ children }) => {
  const { logout } = useUser();

  return (
    <Dash>
      <NavDash>
        {children}
        <section>
<<<<<<< HEAD
          <Linkdash to="/dashboard">
            <img src={prom} alt="icon-promociones" /> Dashboard
          </Linkdash>
          <Linkdash to="/dashboard/Usuarios">
            <img src={prom} alt="icon-promociones" /> Usuarios
          </Linkdash>
          <Linkdash to="/dashboard/Promociones">
            <img src={prom} alt="icon-promociones" /> Promociones
          </Linkdash>
          <Linkdash to="/dashboard/Favoritos">
            <img src={fav} alt="icon-favoritos" />
            Favoritos
          </Linkdash>
          <Linkdash to="/dashboard/Pedidos">
=======
          <Linkdash to="/dashboard/ventas">
>>>>>>> a1b2bb95c5b549fc548f387d612c661e74a4feb0
            <img src={pedidos} alt="icon-pedidos" />
            Ventas 
          </Linkdash>
          <Linkdash to="/dashboard/perfil">
            <img src={perfil} alt="icon-perfil" />
            Perfil
          </Linkdash>
<<<<<<< HEAD
          <Rolecomponent roles={["admin"]}>
=======
          <Rolecomponent roles={['admin']}>
>>>>>>> a1b2bb95c5b549fc548f387d612c661e74a4feb0
            <Linkdash to="/dashboard/usuario">
              <img src={perfil} alt="icon-perfil" />
              Usuario
            </Linkdash>
          </Rolecomponent>
          <Linkdash to="/" onClick={logout}>
            <img src={secion} alt="icon-secion" />
            Cerrar seción
          </Linkdash>
        </section>
      </NavDash>
      <Outlet />
    </Dash>
  );
};

export default Dashnav;
