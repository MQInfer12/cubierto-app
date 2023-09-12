import styled, { keyframes } from "styled-components";
import { ComunStyles, colors } from "./styleGlobal";

export const Content2 = styled.aside`
  background-color: ${colors.primary};
  ${ComunStyles}
  padding:4em;
  & > img{
    width:22em;
    height:26em;
    animation: AparecerDeLaIzquierda 1s;


  }
  & div{
    width:40%;
    margin:0 auto ;
    animation: AparecerDeLaDerecha 1s;

    & h3{
        text-align:right;
        font-size:2.5em;
        letter-spacing:2px;
        color:${colors.light};
    }
    & p{
        padding:1em;
        letter-spacing:1px;
        font-weight:600;
        color:#0008;

    }
  }

`;

export const FracesDiv = styled.section`
 background-color: ${colors.primary};
  ${ComunStyles}
  color:#0008;
height:5em;
padding:5em;
justify-content:space-evenly;
& p{
    width:3em;
    font-weight:600;
&:nth-child(2n){
    margin-top:3em;
}
&:nth-child(3){
    margin-top:4em;
}
}
`; 
const Rotates = keyframes`
  from {
    opacity: 0;
    transform: rotate(5deg)
  }
  to {
    opacity: 1;
    transform: rotate(0deg)
  }
  `

export const Page2 = styled.header`
  background-color: ${colors.primary};
  position: relative;
  z-index: -1;
  width: 99.3vw;
  height: 100vh;
  & > img {
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100vh;
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

        & h3 {
          font-size: 3.4rem;
          color: ${colors.light};
          letter-spacing: 2px;

          & > strong {
            color: ${colors.primary};
          }
        }
        & p {
          color: ${colors.primary};
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
          
        }
        & img:nth-child(3) {
          position: absolute;
          z-index: 1;
          width: 7rem;
          height: auto;
          top: 1.5em;
          left: 14em;
        }
        & img:nth-child(4) {
          position: absolute;
          z-index: 3;
          width: 15rem;
          height: auto;
          left: 10em;
          bottom: 8rem;
        }
      }
    }
  }
`
