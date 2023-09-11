import { Outlet } from "react-router-dom";
import { BodyContainer, BtnRegister, ConNab, ContentNavbar, Links } from "../styles/compStyle";
import { useUser } from "../context/useUser";
import Logo from '../assets/CubiertoIsotipo1.png'

const Navbar = () => {
  const { user } = useUser();
  return (
    <>
      <ConNab>
        <ContentNavbar>
          <div className="logo-container">
            <img src={Logo} />
            <Links to="/">Cubierto</Links>
          </div>
          <nav>
            <Links to="/">Inicio</Links>
            <Links to="/estadisticas">Información</Links>
          </nav>
          <BtnRegister to={user ? 'dashboard' : '/login'}>{
            user ? 'Dashboard' : 'Inicia sesión'
          }</BtnRegister>
        </ContentNavbar>
      </ConNab>
      <BodyContainer>
        <Outlet />
      </BodyContainer>
    </>
  );
};

export default Navbar;
