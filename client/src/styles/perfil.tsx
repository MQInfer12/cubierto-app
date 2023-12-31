import { styled } from "styled-components";
import { ComunStyles, colors } from "./styleGlobal";

export const Container = styled.section`
  width: 100%;
   min-height: 100vh;
  display: flex;
  flex-direction: column;
  & > div {
    ${ComunStyles}
    justify-content:flex-start;
    gap: 1em;
    padding: 2em;
    & > img {
      width: 60px;
      height: auto;
      background: #000;
    }
  }
  & section {
    width: calc(100vw - 280px);
    padding: 2em;
    display: flex;
    flex-wrap: wrap;
    
    gap: 1em;
    & img {
      width: 60px;
      height: 60px;
      border-radius: 1em;
      box-shadow: 0 1px 2px #0005;
    }
    & > div {
      margin: 0 auto;
      width: 49%;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5em;
      & > input,
      textarea {
        border: solid 1px #0005;
        padding: 0.5em;
        width: 100%;
        border-radius: 1em;
        outline: none;
        color: ${colors.gray700};
      }
      & input[type="file"] {
        border: none;
        border-bottom: solid 1px #0005;
        cursor: pointer;
        color: #0005;
      }
      & > input[type="file"]::-webkit-file-upload-button {
        background-color: transparent;
        color: #333;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
      }
      & > label {
        width: 100%;
        font-size: 0.8em;
        letter-spacing: 0.1em;
        color: ${colors.gray700};
      }
      & > button {
        height:3em;
        width:12rem;
        border: none;
        background: ${colors.primary500};
        border-radius: 2em;
        color: ${colors.light};
        font-size: 0.8em;
        font-weight: 400;
        cursor: pointer;
        transition: 0.3s;
        &:hover{
            opacity: 0.8;
            
        }
      }
      & select {
        border-radius: 1em;
        padding: 0.4em 1em;
        border: solid 1px #0005;
        width: 100%;
        outline: none;
             color: ${colors.gray700};
      }
    }
  }
  @media screen and (max-width: 720px) {
    &>section{
      width:100%;
      flex-wrap:wrap;
      & div{
        width:15em;
        & > label{
        width:50%;
      }
      }
    }
  }
`;

export const Divfile = styled.div`
  & > input {
    display: none;
  }
  & > label {
    height: 100px;
    width: 150px;
    border-radius: 6px;
    border: 1px dashed #999;
    &:hover {
      color: #de0611;
      border: 1px dashed #de0611;
    }
  }
`;
export const Portada = styled.article`
  width: calc(100vw - 200px);
  background-color: ${colors.primary || "#0005"};
  height: 32vh;
  position: relative;
  &>.bg{
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${colors.primary500};
    z-index: 1;
    opacity: 0.6;
  }
  & > img {
    position: absolute;
    width: 100%;
    height: 32vh;
    object-fit: cover;
  
  }
  & > div {
    position: absolute;
    content: "";
    bottom: 2em;
    z-index: 4;
    & > input {
      width: 40px;
      height: 40px;
      position: absolute;
      bottom: 0.2em;
      display:none;
      
    }
    & > img {
      position: absolute;
      bottom: 1em;
      left: 2em;
      width: 90px;
      height: 90px;
      border-radius: 20px;
      object-fit: cover;
      
      &:nth-child(2) {
        position: absolute;
        bottom: 0.8rem;
        left: 6.5em;
        border-radius:0;
         width: 26px;
         height: 26px;
         cursor: pointer;
         filter: invert(100%) sepia(0%) saturate(6%) hue-rotate(145deg) brightness(95%) contrast(78%);
      }
      &>input{

      };
    }
  }
  &>.PortadaEdit{
    z-index: 2;
    position: relative;
    width: 100vw;
    height: 100%;
   &>img{
    width: 70px;
    height: 50px;
    position: absolute;
    top: 180px;
    left: 80%;
    padding: 10px;
    background: ${colors.gray700};
    cursor: pointer;
    filter: invert(100%) sepia(0%) saturate(6%) hue-rotate(145deg) brightness(95%) contrast(78%);
    transition: 0.5s;
    &:hover{
      opacity: 0.9;
    }
   }
   &>input{
    display: none;
   }
  }
  @media screen and (max-width: 720px) {
  width: 100vw;
  &>.PortadaEdit{
   &>img{
 width:40px;
 height:40px;  
 top: 70%;
    left: 85%;
  }
   }
  }
`;
