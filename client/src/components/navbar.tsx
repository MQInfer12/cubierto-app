import { Outlet } from "react-router-dom";
import { BtnRegister, ContentNavbar, Links } from "../styles/compStyle";
import { useUser } from "../context/useUser";
const Navbar = () => {
  const { user } = useUser();
  return (
    <>
      <ContentNavbar>
        <Links to="/">Logo</Links>
        <nav>
          <Links to="/quienes-somos">¿Quienes somos?</Links>
          <Links to="/estadisticas">Estadisticas</Links>
          <Links to="/organizacion">Organizacion</Links>
          <Links to="/ofertas">Ofertas</Links>
        </nav>

        <BtnRegister to={user ? '/pedir' : '/login'}>{
          user ? 'dashboard' : 'login'
        }</BtnRegister>
      </ContentNavbar>
      <Outlet />
    </>
  );
};

export default Navbar;
