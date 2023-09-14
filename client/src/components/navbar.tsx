import { Outlet } from "react-router-dom";
import { BodyContainer, BtnRegister, ConNab, ContentNavbar, Links } from "../styles/compStyle";
import { useUser } from "../context/useUser";
import Logo from '../assets/CubiertoIsotipo1.png'
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
  const navigation = useNavigate();
  const { user } = useUser();
  const handleClick = () => {
    if (user) {
      navigation('/dashboard')
    }
    else {
      navigation('/login')
    }
  }
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
          <BtnRegister onClick={handleClick}>{
            user ? user.rol == "usuario" || user.rol=="beneficiario"? 'Disfruta':'Dashboard': 'Inicia sesión'
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
