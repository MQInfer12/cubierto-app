import { styled } from "styled-components";
import { colors, ComunStyles, fonts, sizes, Stylecomun } from "./styleGlobal";
import { Link } from "react-router-dom";

export const Contenedor = styled.header`
  background-color: ${colors.primary};
  position:relative;
`;
export const ConNab = styled.nav`
  background-color: ${colors.primary};
  padding-top: 2rem;
  position: fixed;
  width: 100vw;
  z-index: 5;
`;
export const Divtabla=styled.div`
  height: max-content;
  max-height: 580px;
  border-radius: 10px;
  overflow-y: auto;
  scrollbar-gutter: stable ;
  box-shadow: 0px 5px 5px #0005;
  &.mini{
    max-height: 380px;
  }
`;
export const ContentNavbar = styled.header`
  background-color: ${colors.primary};
  width: 90%;

  ${ComunStyles}
  justify-content:space-between;
  margin: 0rem auto 2rem auto;
  font-size: 20px;
  
  & > nav {
    width: 90%;
    ${ComunStyles}
    gap:2rem;
    font-weight: 400;
    font-size: 16px;
  }

  & > .logo-container {
    display: flex;
    gap: 20px;
    align-items: center;

    & > img {
      height: 32px;
    }
  }
`;

export const Links = styled(Link)`
  color: ${colors.light};
  text-decoration: none;
  font-weight: lighter;
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
export const BtnRegister = styled.button`
  color: ${colors.light};
  text-decoration: none;
  font-size: 16px;
  font-weight: 400;
  background: linear-gradient(
    to right,
    ${colors.gr1},
    ${colors.gr2},
    ${colors.gr2}
  );
  padding: 0.5em 1.5rem;
  border-radius: 3rem;
  white-space: nowrap;
  &:hover {
    background: linear-gradient(
      to right,
      ${colors.gr1},
      ${colors.gr1},
      ${colors.gr2}
    );
  }
`;
export const Content = styled.article`
  ${ComunStyles};
  ${Stylecomun};
  justify-content: space-around;
  height: calc(100vh - 105px);
  & > section {
    ${ComunStyles};
    flex-direction: column;
    gap: 1.5rem;
    width: ${sizes.small};
    color: #fff;
    animation: AparecerDeLaIzquierda 1s;
    & > h1 {
      font-size: 6rem;

      line-height: 96px;
      ${fonts}
    }
    & > p {
      font-size: 2rem;
      ${fonts}
    }
  }
  & > img {
    width: ${sizes.small};
    height: 80%;
    object-fit: cover;
    border-radius: 24px;
    animation: AparecerDeLaDerecha 1s;
  }
`;

export const CarsStyle = styled.section`
  ${ComunStyles}
  width: 90%;
  margin: 3.5rem auto;

  & > div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 2em;
    gap: 1.5rem;
    color: ${colors.light};

    &.hidden {
      opacity: 0;
      filter: blur(5px);
      transform: translateX(-100%);
      transition: none;
    }

    &.show {
      opacity: 1;
      filter: blur(0);
      transform: translateX(0);
      transition: all 1s;
    }

    &:nth-child(1) {
      transition-delay: 200ms;
    }
    &:nth-child(2) {
      transition-delay: 400ms;
    }
    &:nth-child(3) {
      transition-delay: 600ms;
    }

    & > p {
      font-size: 1rem;
      font-weight: 400;
      text-align: justify;
      line-height: 1.75rem;
    }
    & > h2 {
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 2.25rem;
    }
    & > img {
      background-color: ${colors.light};
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }
`;
export const BodyContainer = styled.main`
  padding-top: 105px;
`;