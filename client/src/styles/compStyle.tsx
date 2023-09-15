import { styled } from "styled-components";
import { colors, ComunStyles, fonts, sizes, Stylecomun } from "./styleGlobal";
import { Link } from "react-router-dom";
import { navScrean320, screen320Link } from "./respStyle";

export const Contenedor = styled.header`
  background-color: ${colors.primary};
  position: relative;
`;
export const ConNab = styled.nav`
  background-color: ${colors.primary};
  padding-top: 2rem;
  position: fixed;
  width: 100vw;
  z-index: 5;
  height: 105px;
  & > img {
    display: none;
    filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(287deg)
      brightness(101%) contrast(101%);
  }
${navScrean320}
`;
export const Divtabla = styled.div`
  height: max-content;
  max-height: 580px;
  border-radius: 10px;
  overflow-y: auto;
  scrollbar-gutter: stable;
  box-shadow: 0px 5px 5px #0005;
  &.mini {
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

  & > img {
    display: none;
  }
  & > section {
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
 ${screen320Link}
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
width: 150px;
   box-shadow: 0px 5px 5px rgba(0,0,0,.2);
  color: ${colors.light};
  text-decoration: none;
  font-size: 16px;
  background: ${colors.primary500};
  padding: 0.5em 1.5rem;
  border: none;
  border-radius: 3rem;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  margin: 3.5rem auto;
  & > div {
    width: 30%;
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
      width: 3.5rem;
      height: 3.5rem;
      object-fit: cover;
    }
  }
`;
export const BodyContainer = styled.main`
  padding-top: 105px;

  @media screen and (max-width: 768px) {
    padding-top: 0;
  }
`;
