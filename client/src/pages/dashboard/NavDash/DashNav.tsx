import { Dash, Linkdash, NavDash } from "../../../styles/compStyleDash";
import pedidos from "../../../assets/dash/pedidos.svg";
import perfil from "../../../assets/dash/perfil.svg";
import secion from "../../../assets/dash/secion.svg";
import { Outlet } from "react-router-dom";
import { useUser } from "../../../context/useUser";
import Rolecomponent from "../../../components/rolecomponent";
interface props {
  children: JSX.Element | JSX.Element[] | string
}
const Dashnav = ({children}:props) => {
  const { logout } = useUser();

  return (
    <Dash>
      <NavDash>
        {children}
        <section>
          <Linkdash to="/dashboard/ventas">
            <img src={pedidos} alt="icon-pedidos" />
            Ventas
          </Linkdash>
          <Linkdash to="/dashboard/perfil">
            <img src={perfil} alt="icon-perfil" />
            Perfil
          </Linkdash>
          <Rolecomponent roles={['admin']}>
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
