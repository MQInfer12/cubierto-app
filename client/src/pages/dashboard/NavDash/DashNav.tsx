import { Dash, Linkdash, NavDash } from "../../../styles/compStyleDash";
import pedidos from "../../../assets/dash/pedidos.svg";
import perfil from "../../../assets/dash/perfil.svg";
import secion from "../../../assets/dash/secion.svg";
import category from "../../../assets/dash/categoria.svg";
import usuarios from "../../../assets/dash/usuarios.svg";
import cola from "../../../assets/dash/cola.svg";
import menu from "../../../assets/dash/menu.svg";
import { Outlet } from "react-router-dom";
import { useUser } from "../../../context/useUser";
import Rolecomponent from "../../../components/rolecomponent";
import styled from "styled-components";
import { colors } from "../../../styles/styleGlobal";
import { useState } from "react";
interface props {
  children: JSX.Element | JSX.Element[] | string;
}
const Dashnav = ({ children }: props) => {
  const { logout } = useUser();

  const [abrirNav, setAbrirNav] = useState(true);

  const Accionar = () => {
    setAbrirNav(!abrirNav);
  };
  return (
    <Dash>
      <aside>
        <img src={menu} id="menuA" alt="barraMenu" onClick={Accionar} />
      </aside>
      {abrirNav && (
        <NavDash>
          <img src={menu} id="menuA" alt="barraMenu" onClick={Accionar} />

          {children}
          <article>
            <Linkdash to="/dashboard">
              <img src={pedidos} alt="icon-pedidos" />
              Ventas
            </Linkdash>
            <Linkdash to="dashboard/cola">
              <img src={cola} alt="icon-pedidos" />
              Cola
            </Linkdash>
            <Linkdash to="dashboard/categorias">
              <img src={category} alt="icon-categoria" />
              Categorias
            </Linkdash>
            <Rolecomponent roles={["admin"]}>
              <Linkdash to="/dashboard/usuario">
                <img src={usuarios} alt="icon-perfil" />
                Usuario
              </Linkdash>
            </Rolecomponent>
            <Linkdash to="/dashboard/perfil">
              <img src={perfil} alt="icon-perfil" />
              Perfil
            </Linkdash>
            <Linkdash to="/" onClick={logout}>
              <img src={secion} alt="icon-secion" />
              Cerrar seción
            </Linkdash>
          </article>
        </NavDash>
      )}
      <Outdi>
        <Outlet />
      </Outdi>
    </Dash>
  );
};

export default Dashnav;

const Outdi = styled.div`
  width: 100%;
  height: 100%;
  background: ${colors.bg};
`;
