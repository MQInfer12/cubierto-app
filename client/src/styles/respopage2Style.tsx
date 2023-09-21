import { css } from "styled-components";

export const AsideNotasStyleres = css`
 @media screen and (max-width: 768px) {
    padding: 0 ;
    height:110%;
    & > h3 {
      width: 100%;
      margin: 0 !important;
      padding: 0 1em ;
      font-size: 2em;
    }
    & > div {
      flex-direction: column;
      width: 100vw;
      gap: 1em;
      padding: 2em;
      & > img {
        width: 80vw ;
      }
      & section {
        width: 100%;
        font-size: 0.7em;
        & p{
        font-size: 1.5em;

        }
      }
    }
  }

`
export const Content2resp = css`
 @media screen and (max-width: 720px) {
    flex-direction:column;
    & > div{
    flex-direction:column;
    width:100vw;
    & img{
      width:80%;
      height:auto;
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
export const SectionAliadosStyleres = css`
  @media screen and (max-width: 720px) {
    height: auto;
    height: 120vh;
    & img {
      height: 120vh;
    }
    & article {
      padding: 2em;
      & h3 {
        width: 100%;
        margin-top: 1em;
        font-size: 2em;
      }
    }
    & aside {
      & div {
        width: 100%;
        height: 8em;
        & > h2 {
          font-size: 1em;
        }
      }
    }
  }
`
