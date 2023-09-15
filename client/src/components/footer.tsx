import styled from "styled-components";
import { Link } from "react-router-dom";
import { ComunStyles, colors } from "../styles/styleGlobal";
import { footer420 } from "../styles/respStyle";
const Footer = () => {
  return (
    <Foote>
      <div>
        <h2>CUBIERTO</h2>

        <div className="links">
          <Links to="/">Inicio</Links>
          <Links to="">Información</Links>
          <Links to="/login">Iniciar sesión</Links>
        </div>
        <span />
        <section className="datos">
          <label>CIDTU - Unifranz - Derechos reservados 2023</label>
          <div>
            <Oval></Oval>
            <Oval></Oval>
            <Oval></Oval>
            <Oval></Oval>
          </div>
        </section>
      </div>
    </Foote>
  );
};

export default Footer;
const Foote = styled.footer`
  width: 100vw;
  height: 15rem;
  ${ComunStyles}
  flex-direction: column;
  align-items: start;
  background-color: ${colors.primary};
  margin: 0 auto;
 ${footer420}
  & h2 {
    color: #e4eaf1;
  }
  & > div {
    width: 60%;
    margin: 0 auto;
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
  @media screen and (max-width: 420px) {
    width: 3rem;
    height: 2rem;
  }
`;
