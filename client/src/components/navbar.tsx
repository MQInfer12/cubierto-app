import { Outlet } from "react-router-dom";
import {
  BodyContainer,
  BtnRegister,
  ConNab,
  ContentNavbar,
  Links,
} from "../styles/compStyle";
import { useUser } from "../context/useUser";
import Logo from "../assets/CubiertoIsotipo1.png";
import { useNavigate } from "react-router-dom";
import menu from "../assets/menu.png";
import { useState } from "react";
const Navbar = () => {
  const [abrirNav, setAbrirNav] = useState(true);
  const navigation = useNavigate();
  const { user } = useUser();

  const handleClick = () => {
    if (user) {
      navigation("/dashboard");
      console.log("days");
    } else {
      navigation("/login");
    }
  };
  const abrir = () => {
    setAbrirNav(!abrirNav);
  };
  const cerrar = () => {
    setAbrirNav(!abrirNav);
  };

  return (
    <>
      <ConNab>
        <img onClick={abrir} src={menu} />
        {abrirNav && (
          <ContentNavbar>
            <img onClick={abrir} src={menu} />
            <div className="logo-container">
              <img src={Logo} />
              <Links to="/">Cubierto</Links>
            </div>
            <section>
              <Links to="/">Inicio</Links>
              <Links to="/estadisticas">Información</Links>
            </section>
            <BtnRegister onClick={handleClick}>
              {user
                ? user.rol == "usuario" || user.rol == "beneficiario"
                  ? "Disfruta"
                  : "Dashboard"
                : "Inicia sesión"}
            </BtnRegister>
          </ContentNavbar>
        )}
      </ConNab>
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </>
  );
};

export default Navbar;
