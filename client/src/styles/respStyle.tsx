import { css } from "styled-components";
import { ComunStyles, Stylecomun, colors, fonts, sizes } from "./styleGlobal";

export const screen320Link = css`
  @media screen and (max-width: 768px) {
    width: 100%;
    color: ${colors.primary};
    border-left: 2px solid ${colors.primary};
    padding: 0 1em;
    &:active {
      background-color: ${colors.primary};
    }
  }
`;

export const navScrean320 = css`
  @media screen and (max-width: 768px) {
    align-items: start;
    justify-content: start;
    position: fixed;
    height: 3em;
    background-color: ${colors.primary};
    padding: 0;
    & > img {
      position: absolute;
      display: block;
      width: 25px;
      top: 1em;
      right: 1em;
    }
    & > header {
      ${ComunStyles}
      height: 100vh;
      background-color: #fff;
      flex-direction: column;
      width: 80vw;
      overflow: hidden;
      justify-content: space-evenly;
      position: absolute;
      & > img {
        display: flex;
        position: absolute;
        top: 1em;
        right: 1em;
      }
      & > section {
        ${ComunStyles}
        flex-direction: column;
      }
    }
  }
`;
export const footer420 = css`
  @media screen and (max-width: 768px) {
    width: 100vw;
    overflow: hidden;
    gap: 2em;

    .links {
      display: none;
    }
    .datos {
      width:100%;
      flex-direction: column;
      justify-content: center;
      & > div {
        justify-content: center;
        gap: 0.5em;
      }
    }
  }
`;
// nav y footer

export const imgheaderscren420 = css`
  @media screen and (max-width: 420px) {
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 0;
    width: 100vw;
    height: 100vh;
    & > img {
      position: absolute;
      width: 100%;
      z-index: -1;
      border-radius: 0 0 2em 2em;
      top: 2em;
      box-shadow: 0 2px 10px ${colors.primary};
    }
    & > section {
      position: absolute;
      width: 100%;
      background-color: #0007;
      padding: 0 0 1em 0;
      bottom: 0;
      border-radius: 0 0 2em 2em;
      gap: 0;
      & h1 {
        font-size: 2em;
        z-index: 3;
      }
      & p {
        width: 60%;
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 0;
    width: 100vw;
    height: 60vh;
    & > img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      top: 0;
      border-radius: 0 0 2em 2em;
      box-shadow: 0 2px 10px ${colors.primary};
    }
    & > section {
      position: absolute;
      width: 100%;
      padding: 0 0 1em 0;
      bottom: 0;
      border-radius: 0 0 2em 2em;
      gap: 0;
      box-shadow: 0 2px 10px ${colors.dark};
      background-color: #fff9;
      color: ${colors.primary};
      & h1 {
        font-size: 2em;
        z-index: 3;
        width: 100%;
        text-align: center;
      }
      & p {
        width: 60%;
        font-size: 14px;
        text-align: center;
      }
    }
  }
  @media screen and (min-width: 769px) {
    justify-content: center;
    width: 100vw;
    height: 60vh;
    overflow: hidden;
    & img {
      width: 40%;
      height: 100%;
    }
    & section {
      width: 40%;
      & h1 {
        font-size: 3em;
      }
      & p {
        font-size: 1.3em;
      }
    }
  }
  @media screen and (min-width: 1024px) {
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
      animation: AparecerDeLaDerecha 1s;
    }
  }
`;
export const slyder320 = css`
  @media screen and (max-width: 420px) {
    width: 100vw;
    & aside {
      width: 80vw;
      padding: 0em;

      flex-direction: column;
      & h3 {
        font-size: 1.5rem;
      }
      & > div {
        width: 70%;
        & h2 {
          font-size: 1.5rem;
        }
        & p {
          width: 80vw;
          font-size: 1rem;
        }
      }
    }
    & article {
      width: 90vw;
      padding: 1em;
      overflow: hidden;
    }
  }
  @media screen and (max-width: 769px) {
    width: 80vw;
    padding: 2em;
    & aside {
      width: 80vw;

      padding: 0em !important;
      flex-direction: column;
      & h3 {
        font-size: 1.5rem;
      }
      & > div {
        width: 60%;
        & h2 {
          font-size: 1.5rem;
        }
        & p {
          width: 80vw;
          font-size: 1rem;
        }
      }
    }
    & article {
      width: 80vw;
      padding: 1em;
      overflow: hidden;
    }
  }
`;
export const car420 = css`
  @media screen and (max-width: 420px) {
    padding: 1em !important;
    gap: 0;
    flex-direction: column;
    height: 50vh;
    & > div {
      ${ComunStyles}
      flex-direction: column;
      width: 100% !important;
      padding: 0;
      & p {
        width: 100%;
      }
      & h2 {
        padding: 1em;
      }
    }
    & section {
      display: flex;
      flex-direction: column !important;
    }
  }
  @media screen and (max-width: 769px) {
    padding: 1em !important;
    gap: 0;
    flex-direction: column;
    height: 50vh;
    & > div {
      ${ComunStyles}
      flex-direction: column;
      width: 100% !important;
      padding: 0;
      & p {
        width: 100%;
      }
      & h2 {
        padding: 1em;
      }
    }
    & section {
      display: flex;
      flex-direction: column !important;
    }
  }
  @media screen and (min-width: 769px) {
    padding: 1em !important;
    gap: 0;
    height: 20vh;
    width: 100%;
    & > div {
      ${ComunStyles}
      width: 100% !important;
      padding: 0;
      flex-wrap: wrap;
      justify-content: start;
      & p {
        width: 40vw;
      }
      & h2 {
        padding: 0em;
      }
    }
    & section {
      display: flex;
    }
  }
  @media screen and (min-width: 1030px) {
    padding: 1em !important;
    gap: 0;
    height: 20vh;
    width: 80%;
    & > div {
      ${ComunStyles}
      width: 100% !important;
      padding: 0;
      flex-wrap: wrap;
      justify-content: start;
      & p {
        width: 35vw;
      }
      & h2 {
        width: 100%;
        padding: 0em;
      }
    }
    & section {
      display: flex;
    }
  }
`;
