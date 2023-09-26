import { Outlet, useLocation } from "react-router-dom";
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
import { useEffect, useState } from "react";
const Navbar = () => {
  const location = useLocation();
  const [abrirNav, setAbrirNav] = useState(false);
  const navigation = useNavigate();
  const { user } = useUser();

  const handleClick = () => {
    if (user) {
      navigation("/dashboard");
    } else {
      navigation("/login");
    }
  };
  const abrir = () => {
    setAbrirNav(old => !old);
  };

  useEffect(() => {
    setAbrirNav(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <ConNab>
        <img onClick={abrir} src={menu} />
        <ContentNavbar active={abrirNav}>
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
            {
              user
              ? user.rol == "usuario" || user.rol == "beneficiario"
                ? "Descarga la app"
                : "Dashboard"
              : "Inicia sesión"
            }
          </BtnRegister>
        </ContentNavbar>
      </ConNab>
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </>
  );
};

export default Navbar;
