import { css } from "styled-components";
import { ComunStyles, Stylecomun, colors, fonts, sizes } from "./styleGlobal";

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
  position:fixed;
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
  }`
  export const footer420 = css`
  @media screen and (max-width: 768px) {
     width: 100vw;
     overflow: hidden;
     gap:1em;
   margin: 2em auto 0 0;
 
     .links {
       display: none;
     }
     .datos {
       flex-direction: column;
       justify-content: center;
       & > div {
         justify-content: center;
         gap: 0.5em;
       }
     }
   }
 `
// nav y footer


export const imgheaderscren420 = css`
  @media screen and (max-width: 420px) {
    flex-direction: column;
    position: relative;
    z-index: 1;
    padding: 0;
    width: 100vw;
    height:60vh;
    overflow:hidden;
    & > img {
      position: absolute;
      width: 100%;
      z-index: -1;
      border-radius: 0 0 2em 2em ;
      top:2em;
      box-shadow:0 2px 10px ${colors.primary};
    }
    & > section {
      position: absolute;
      width: 100%;
      background-color: #0007;
      padding:0 0 1em 0;
      bottom:3.5em;
      border-radius: 0 0 2em 2em ;
      gap:0;
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
    height:60vh;
    overflow:hidden;
    & > img {
      position: absolute;
      width: 100%;
      z-index: -1;
      border-radius: 0 0 2em 2em ;
      top:2em;
      box-shadow:0 2px 10px ${colors.primary};
    }
    & > section {
      position: absolute;
      width: 100%;
      background-color: #0007;
      padding:0 0 1em 0;
      bottom:3.5em;
      border-radius: 0 0 2em 2em ;
      gap:0;
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
    border-radius: 24px;
    animation: AparecerDeLaDerecha 1s;
  }
}

`;
export const slyder320 = css`
 @media screen and (max-width: 420px) {
    width: 100vw;
    & aside {
      width: 100vw;
      padding: 2em;
      flex-direction: column;
      & h3 {
        font-size: 1.5rem;
      }
      & > div {
        width: 80%;
        & h2 {
          font-size: 1.5rem;
        }
        & p {
          width: 80vw;
          font-size: 1rem;
        }
      }
    }
    & article{
        width:95vw;
        padding:1em;
        overflow:hidden;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100vw;
    & aside {
      width: 100vw;
      padding: 2em;
      flex-direction: column;
      & h3 {
        font-size: 1.5rem;
      }
      & > div {
        width: 80%;
        & h2 {
          font-size: 1.5rem;
        }
        & p {
          width: 80vw;
          font-size: 1rem;
        }
      }
    }
    & article{
        width:95vw;
        padding:1em;
        overflow:hidden;
    }
  }
 
`;
export const car420 = css`
  @media screen and (max-width: 420px) {
    padding: 0;
    gap: 0;
    & > section {
      flex-direction: column;
      height: 50vh;
      width: 80vw;
      padding:0;
      & > div {
        flex-direction: column;
        width: 100vw;
        padding: 2em;
        gap:0;

        & > div {
          ${ComunStyles}
          flex-direction: column;
          width:60vw;
          & p {
            width: 80%;
          }
          & h2{
            padding:1em ;
          }
        }
        & > section {
          flex-direction: column;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0;
    gap: 0;
    & > section {
      flex-direction: column;
      height: 50vh;
      width: 80vw;
      padding:2em;
      & > div {
        flex-direction: column;
        width: 100vw;
        padding: 2em;
        gap:0;

        & > div {
          ${ComunStyles}
          flex-direction: column;
          width:60vw;
        padding: 0 4em;

          & p {
            width: 80%;
          }
          & h2{
            padding:1em ;
          }
        }
        & > section {
          flex-direction: column;
        }
      }
    }
  }
  @media screen and (min-width: 769px) {
    padding: 0;
    gap: 0;
    & > section {
      flex-direction: column;
      height: 28vh;
      padding:2em;
      & > div {
        flex-direction: column;
        width: 100vw;
        padding: 2em;
        gap:0;

        & > div {
          ${ComunStyles}
          flex-direction: column;
          width:60vw;
        padding: 0 4em;

          & p {
            width: 80%;
          }
          & h2{
            padding:1em ;
          }
        }
        & > section {
            margin:0 auto;
            width:30%;
          flex-direction: row;
        }
      }
    }
  }
`;
