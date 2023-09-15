import { css } from "styled-components";
import { ComunStyles, colors } from "./styleGlobal";

export const screen320Link = css`
 @media screen and (max-width: 768px) {
    width: 100%;
    color: ${colors.primary};
    border-left:2px solid ${colors.primary};
    padding:0 1em;
&:active{
background-color:${colors.primary};
}
  }
`;

export const navScrean320 = css`

@media screen and (max-width: 768px) {
    align-items: start;
    justify-content: start;
    position: relative;
    height: 3em;
    background-color: ${colors.primary};
    padding: 0;
    & > img {
      position: absolute;
      display: block;
      width: 25px;
      z-index: 1050;
      top: 1em;
      left: 1em;
    }
    & > header {
      ${ComunStyles}
      height: 100vh;
      background-color: #fff;
      flex-direction: column;
      width: 80vw;
      justify-content:space-evenly;
      position: absolute;
      animation: AparecerDeLaIzquierda 1s;
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
    @media screen and (max-width: 768px) {

    }
  }`
  