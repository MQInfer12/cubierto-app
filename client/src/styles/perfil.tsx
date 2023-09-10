import { styled } from "styled-components";
import { ComunStyles, colors } from "./styleGlobal";

export const Container = styled.section`
  width: 80%;
  margin: 2em auto;
  display: flex;
  flex-direction: column;
  & > div {
    ${ComunStyles}
    justify-content:flex-start;
    gap: 1em;
    padding: 2em;
    border-bottom: solid 1px #0005;
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
      }
      & > button {
        padding: 0.4em 1em;
        border: none;
        background: ${colors.primary};
        border-radius: 2em;
        color: ${colors.light};
        font-size: 0.8em;
        font-weight: 100;
        cursor: pointer;
      }
      & select{
        border-radius:1em;
        padding:.4em 1em;
        border:solid 1px #0005;
      }
    }
  }
`;

export const Divfile=styled.div`
  &>input{
    display: none;
  }
  &>label{
    height: 100px;
    width: 150px;
    border-radius: 6px;
    border: 1px dashed #999;
    &:hover{
      color: #de0611;
      border: 1px dashed #de0611;
    }
  }
`