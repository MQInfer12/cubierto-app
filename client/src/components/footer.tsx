
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ComunStyles, colors } from "../styles/styleGlobal";
import Facebook from '../assets/redesSociales/facebook.png'
import Instagram from '../assets/redesSociales/instagram.png';
import Twitter from '../assets/redesSociales/gorjeo.png';
import Linke from '../assets/redesSociales/linkedin.png'
const Footer = () => {
  return (
    <Foote>
      <h2>CUBIERTO</h2>
      <div>
        <div>
          <Links to="/">Inicio</Links>
          <Links to="">Información</Links>
          <Links to="/login">Iniciar sesión</Links>
        </div>
        <span />
        <section>
          <label>CIDTU - Unifranz - Derechos reservados 2023</label>
          <div>
            <Oval>
              <a href="https://www.facebook.com/unifranz.edu/?locale=es_LA" target="_blank" ><img src={Facebook} alt="" /></a></Oval>
            <Oval><a href="https://www.instagram.com/unifranz/?hl=es" target="_blank"><img src={Instagram} alt="" /></a></Oval>
            <Oval> <a href="https://twitter.com/UnifranzBolivia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor" target="_blank"><img src={Twitter} alt="" /></a></Oval>
            <Oval><a href="https://bo.linkedin.com/school/universidad-franz-tamayo/" target="_blank"><img src={Linke} alt="" /></a></Oval>
          </div>
        </section>
      </div>
    </Foote>

  );
};

export default Footer;
const Foote = styled.footer`
  width: 100%;
  height: 15rem;
  display: flex;
  flex-direction: row;
  ${ComunStyles}
  background-color:${colors.primary};
  & > h2 {
    width: 0vw;
    height: 100%;
    color: #e4eaf1;
    background: #000;
  }
  & > div {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;

    & > span {
      width: 100%;
      height: 0.1vh;
      background: #e4eaf1;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: end;
      height: 50%;
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    & > section {
      width: 100%;
      height: calc(50% - 0.2vh);
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      color: #e4eaf1;
      & > div {
        display: flex;
        flex-direction: row;
        gap: 3rem;
        margin: 1rem 0.5rem;
      }
    }
  }
`;
const Links = styled(Link)`
  color: ${colors.light};
  text-decoration: none;
  font-size: 1rem;
  line-height: 1.3rem;
  margin: auto 1.5rem;
  position: relative;

  &::after {
    content: "";
    height: 1px;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: ${colors.light};
    width: 0;
    transform-origin: right;
    transition: width 0.3s;
  }

  &:hover::after {
    transform-origin: left;
    width: 100%;
  }
`;
const Oval = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #e4eaf1;
 
  &>a{
    width: 100vh;
    height: 100vh;
    z-index: 1;
    position: relative;
    
    &>img{
      width: 100%;
      height: 100%;
      z-index: 0;
      
    }
  }
`;
