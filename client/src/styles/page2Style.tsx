import styled, { keyframes } from "styled-components";
import { ComunStyles, colors, girar1 } from "./styleGlobal";

export const Content2 = styled.aside`
  background-color: ${colors.primary};
  ${ComunStyles}
  padding:4em;
  justify-content: space-around;
  & > img {
    width: 22em;
    height: 30em;
    animation: AparecerDeLaIzquierda 1s;
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
`;

export const FracesDiv = styled.section`
  background-color: ${colors.primary};
  ${ComunStyles}
  color:#0008;
  height: 5em;
  padding: 10em 5em;
  justify-content: space-evenly;
  & p {
    width: 3em;
    font-weight: 600;
    &:nth-child(2n) {
      margin-top: 3em;
    }
    &:nth-child(3) {
      margin-top: 4em;
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
  & h2 {
    color: ${colors.primary};
    text-align: center;
    padding: 1em 0 0 0;
    font-size: 1.8em;
    letter-spacing: 2px;
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
        & h3 {
          font-size: 3.4rem;
          color: ${colors.light};
          letter-spacing: 2px;
          width: 65%;
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
    & > div {
      width: 18em;
      height: 8em;
      background-color: ${colors.primary};
      border-radius: 18px;
    }
  }
`;
export const AsideNotasStyle = styled.aside`
  background-color: ${colors.primary};
  padding: 5em 3em;
  & h3 {
    margin: 1em 0;
    font-size: 3em;
    letter-spacing: 2px;
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
`;
