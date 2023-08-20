import { Dash, Linkdash, NavDash } from "../../../styles/compStyleDash";
import prom from "../../../assets/dash/promociones.svg";
import fav from "../../../assets/dash/favoritos.svg";
import pedidos from "../../../assets/dash/pedidos.svg";
import perfil from "../../../assets/dash/perfil.svg";
import secion from "../../../assets/dash/secion.svg";
import { Outlet } from "react-router-dom";
import { useUser } from "../../../context/useUser";
const Dashnav = ({ children }) => {

const {logout}= useUser();

  return (
    <Dash>
      <NavDash>
        {children}
        <section>
        <Linkdash to="/dashboard">
            <img src={prom} alt="icon-promociones" /> Dashboard
          </Linkdash>
          <Linkdash to="/dashboard/Promociones">
            <img src={prom} alt="icon-promociones" /> Promociones
          </Linkdash>
          <Linkdash to="/dashboard/Favoritos">
            <img src={fav} alt="icon-favoritos" />
            Favoritos
          </Linkdash>
          <Linkdash to="/dashboard/Pedidos">
            <img src={pedidos} alt="icon-pedidos" />
            Pedidos
          </Linkdash>
          <Linkdash to="/dashboard/Perfil">
            <img src={perfil} alt="icon-perfil" />
            Perfil
          </Linkdash>
          <Linkdash to="/"  onClick={logout}>
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
