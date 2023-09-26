import styled, { keyframes } from "styled-components";
import { ComunStyles, colors, girar1 } from "./styleGlobal";
import {
  AsideNotasStyleres,
  Content2resp,
  SectionAliadosStyleres,
} from "./respopage2Style";

export const Content2 = styled.aside`
  background-color: ${colors.primary};
  ${ComunStyles}
  padding:4em;

  justify-content: space-around;
  & > div {
    ${ComunStyles}
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
    & > img {
      width: 22em;
      height: 30em;
      animation: AparecerDeLaIzquierda 1s;
      border-radius: 32px;
    }
    & div {
      width: 40%;
      ${ComunStyles}
      flex-direction:column;
      gap: 2em;
      animation: AparecerDeLaDerecha 1s;
      & h3 {
        text-align: right;
        font-size: 2.5em;
        letter-spacing: 2px;
        color: ${colors.light};
      }
      & p {
        padding: 1em;
        letter-spacing: 1px;
        font-weight: 600;
        color: #0008;
        font-size: 1.5em;
      }
    }
  }

  ${Content2resp}
  @media screen and (max-width: 1200px) {

    flex-direction:column;
    & > div{
    flex-direction:column;
    width:100vw;
    & img{
      width:90%;
      height:20em;
      object-fit:cover;
    }
    & > div{
    width:100%;
    padding:2em;
      & h3{
         width:50%;
        font-size: 1em ;
        padding:0;
      }
      & p{
        font-size: 1em ;
        padding:0;
      }
    }

    }
  }
  
`;

export const FracesDiv = styled.section`
  background-color: ${colors.primary};
  ${ComunStyles}
  color:#0008;
  height: 5em;
  padding: 10em 5em;
  justify-content: space-evenly;
  & p {
    width: 10em;
    font-weight: 600;
    &:nth-child(2n) {
      margin-top: 3em;
    }
    &:nth-child(3) {
      margin-top: 4em;
    }
  }
  @media screen and (max-width: 720px) {
    padding: 0 3em 3em 3em;
    height: auto;
    flex-wrap: wrap;
    & p {
      width: 7em;
    }
  }
`;
const animateLetras = keyframes`
  0% {
        opacity: 0;
        transform: translateY(0);
    }
    25% {
        opacity: 1;
        transform: translateY(-10px);
    }
    50% {
        opacity: 0;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(0);
    }
  `;

export const Page2 = styled.header`
  background-color: ${colors.primary};
  position: relative;
  z-index: -1;
  width: 99.7vw;
  height: 100vh;

  & > img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }

  & > section {
    position: absolute;
    height: 80%;
    width: 100%;
    ${ComunStyles}

    & div {
      align-content: center;
      height: 100%;
      ${ComunStyles}
      flex-wrap:wrap;
      &:nth-child(1) {
        width: 50%;
        padding: 3em;
        ${ComunStyles}
        justify-content:start;
        & h1 {
          font-size: 3.4rem;
          color: ${colors.light};
          letter-spacing: 2px;
          width: 70%;
          & strong {
            &:first-child {
              margin: 0 2px;
            }
            & span {
              display: inline-block;
              color: ${colors.primary};
              font-size: 3.4rem;
              animation: jump 1.5s ease-in-out infinite;
              @keyframes jump {
                0%,
                100% {
                  transform: translateY(0);
                }
                50% {
                  transform: translateY(-10px);
                }
              }
            }
          }
        }

        & p {
          color: ${colors.primary};
          margin: 1.5em 0;
        }
      }

      &:nth-child(2) {
        position: relative;
        width: 40em;
        animation: AparecerDeLaDerecha 1s;

        & img:nth-child(1) {
          position: absolute;
          z-index: -1;
          width: 28rem;
          height: auto;
          bottom: 5em;
        }
        & img:nth-child(2) {
          position: absolute;
          z-index: 2;
          width: 21rem;
          height: auto;
          right: 2.5em;
          bottom: 8rem;
          animation: ${girar1} 10s ease infinite;
        }
        & img:nth-child(3) {
          position: absolute;
          z-index: 1;
          width: 7rem;
          height: auto;
          top: 7rem;
          left: 14em;
          animation: ${girar1} 5s linear infinite;
        }
        & img:nth-child(4) {
          position: absolute;
          z-index: 3;
          width: 15rem;
          height: auto;
          left: 10em;
          bottom: 8rem;
          animation: ${girar1} 4s linear infinite;
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    width: 100vw;
    height: 70vh;

    & > section div:nth-child(1) {
      margin-top: 10em;
      width: 100vw;
      & > h1 {
        font-size: 2em;
        width: 100vw;
      }
      & p {
        font-size: 0.8em;
        margin: 2em 0;
      }
    }
    & > section div:nth-child(1) h1 strong span {
      font-size: 1em;
    }
    & > section div {
      width: 100vw;
      height: 75vh;
      position: absolute;
    }
    & > section div:nth-child(2) {
      width: 100vw;
    }
    & > section div:nth-child(2) img:nth-child(1) {
      width: 100px;
      bottom: -1em;
    }
    & > section div:nth-child(2) img:nth-child(2) {
      width: 80px;
      bottom: -1em;
      left: 50%;
    }
    & > section div:nth-child(2) img:nth-child(3) {
      width: 50px;
      bottom: 2em;
      top: auto;
      left: 45%;
    }
    & > section div:nth-child(2) img:nth-child(4) {
      width: 50px;
      bottom: -1em;
    }
  }
  @media screen and (max-width: 980px) {
    width: 100vw;
    height: 70vh;
    justify-content: start;

    & > section div:nth-child(1) {
      margin-top: 5em;
      width: 75vw;
      & > h1 {
        font-size: 2em;
        width: 100vw;
      }
      & p {
        font-size: 0.8em;
        margin: 2em 0;
      }
    }
    & > section {
      justify-content: start;
    }
    & > section div:nth-child(1) h1 strong span {
      font-size: 1em;
    }
    & > section div {
      width: 100vw;
      height: 75vh;
      position: absolute;
    }
    & > section div:nth-child(2) {
      width: 100vw;
    }
    & > section div:nth-child(2) img:nth-child(1) {
      width: 150px;
      bottom: 30%;
      right: 2em;
    }
    & > section div:nth-child(2) img:nth-child(2) {
      width: 120px;
      bottom: 30%;
      right:1.5em;
    }
    & > section div:nth-child(2) img:nth-child(3) {
      width: 50px;
      bottom: 50%;
      top: auto;
      right: 5em;
      left:auto;
    }
    & > section div:nth-child(2) img:nth-child(4) {
      width: 80px;
      bottom: 30%;
      top: auto;
      right: 7em;
      left:auto;
    }
  }
`;

export const SectionAliadosStyle = styled.section`
  height: 45em;
  position: relative;
  & > img {
    content: "";
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 45em;
    background-color: ${colors.primary};
  }
  & > article {
    width: 100%;
    ${ComunStyles}
    height:42em;
    color: ${colors.light};
    align-items: start;
    padding: 3em;
    flex-direction: column;
    gap: 2em;
    & h3 {
      font-size: 3em;
      letter-spacing: 2px;
    }
  }
  & aside {
    ${ComunStyles}
    flex-wrap:wrap;
    gap: 2em;
    width: 100%;
    & p {
      font-size: 0.8em;
    }
    & > div {
      width: 18em;
      height: 10em;
      background-color: ${colors.primary};
      border-radius: 18px;
      padding: 2em;
    }
  }
  ${SectionAliadosStyleres}
`;
export const AsideNotasStyle = styled.aside`
  background-color: ${colors.primary};
  padding: 5em 3em;

  & h3 {
    margin: 1em 0;
    letter-spacing: 2px;
    font-size: 3em;
    color: ${colors.light};
  }
  & div {
    ${ComunStyles}
    justify-content:space-around;
    gap: 10em;
    & > img {
      animation: AparecerDeLaIzquierda 1s;
      width: 35%;
    }
  }
  & section {
    ${ComunStyles}
    flex-direction:column;
    align-items: start;
    gap: 2em;
    width: 60%;
    & p {
      width: 80%;
      font-size: 2em;
      color: #0008;
      font-weight: 600;
      animation: AparecerDeLaDerecha 1s;
    }
    & > strong {
      font-size: 1.4em;
      color: #0008;
      font-weight: 600;
      animation: AparecerDeLaDerecha 1.5s;
    }
  }
  ${AsideNotasStyleres}
`;
