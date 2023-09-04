import { styled } from "styled-components";
import { ComunStyles, buttonStyle, colors } from "./styleGlobal";
import { Link } from "react-router-dom";

export const Dash = styled.section`
  display: flex;
  flex-direction: row;
  width:98vw;
`;

export const NavDash = styled.nav`
  background-color: ${colors.light};
  width: 210px;
  height: 100vh;
  box-shadow: 0px 5px 5px #0005;
  flex-direction: column;
  display: flex;
  
  text-align: center;
  padding: 40px;
  gap: 8em;
  & img {
    margin: 0 auto;
    width: 80px;
    border-radius: 50%;
    height: 80px;
    ${ComunStyles}
  }
  & p {
    color: ${colors.dark};
    font-weight: 900;
  }
  & h3 {
    font-weight: 100;
    font-size: 10px;
    width: 150px;
    word-wrap: break-word;
  }
  & h2 {
    font-size: 16px;
    font-weight: 900;
  }
  & section {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
  }
`;
export const Linkdash = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction:row;
  justify-content: flex-start;
  color: ${colors.dark};
  width: 100%;
  font-size: 15px;
  &:hover {
    color: ${colors.primary};
    & img {
      filter: saturate(100);
    }
  }
  & img {
    width: 16px;
    height: 16px;
    
  }
`;
// del lado de el dashbard
export const Dashbo = styled.section`
  display: flex;
  padding: 3em;
  padding-left:calc(210px + 3rem) ;
  width: 100%;
  height: 100%;
  flex-direction: column;
  & > article {
    width: 50%;
    margin: 2.5em auto;
    display: flex;
    flex-direction: column;
    gap: 1em;
    & h2 {
      color: #000;
      font-family: Poppins;
      font-size: 48px;
      font-style: normal;
      font-weight: 700;
      line-height: 48px; /* 100% */
    }
    & p {
      color: #8b8686;
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
  }
`;

export const BusquedaStyle = styled.section`
  display: flex;
  gap: 1em;
  height: 5vh;
  width: 20%;
  border-radius: 3em;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
  padding: 8px 24px;
  & input {
    border: none;
    width: 100%;
    outline: none;
  }
  & > img {
    width: 24px;
  }
`;

export const CasrStyle = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
margin:0 auto;
  & > div {
    box-shadow:0 3px 10px 5px #0005;
    transition:all .5s ease-in-out;
    border-radius: 8px 8px 0px 0px;

    &:hover{
        transform:scale(1.1);
      }
    & > img {
      width: 300px;
      height: 168px;
      border-radius: 8px 8px 0px 0px;
      
    }
    & > article {
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      padding: 1em;
      & > p {
        color: #8b8686;

        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
      & > em {
        color: #e75854;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
      }
      & > strong {
        display: flex;
        align-items: center;
        color: #8b8686;
        font-family: Poppins;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;

        & img {
        }
      }
    }
  }
  /* width: 310px;
height: 328px;
box-shadow:0px 5px 5px #0005;
background-color:#0000;
display:flex;
flex-direction:column;
font-size: 14px;
font-weight: 500;
line-height: normal;
& div{
  & article{
  padding:1em;
  display:flex;
  flex-direction:column;
  gap:.5em;
  & > img{
    width: 310px;
height: 168px;
border-radius: 8px 8px 0px 0px;
}
& > em{
  color: #E75854;
font-size: 14px;
font-style: normal;
font-weight: 500;
}
& strong{
  font-size: 14px;
font-weight: 500;
}
} */
`;


export const Section = styled.section`
  margin: 0 auto;
  padding: 2em;
  width: 80%;
  display: flex;
  gap: 3em;
  flex-direction: column;
  & article {
    ${ComunStyles}
    flex-direction:row;
    justify-content: space-between;
    & p {
      font-size: 2em;
      font-weight: bold;
    }
    & > button {
      ${buttonStyle}
    }
  }
  & > table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;

    & > thead {
      & > tr {
        background-color: #e4e4e453;

        & > th {

          font-size:12px;
          font-weight: 100;
          padding: 0.7em 1em;
          text-align: start;
          text-transform:uppercase;
          color:#0008;
        }
      }
    }
    & tbody {
      /* width:100%;
      display: block; /* Cambia a block o inline-block */
  /* padding: 10px; */ 
      & > tr {
        & > td {
          padding:0 0.5em;
          & >article{
            ${ComunStyles}
            justify-content:flex-start;
            gap:1em;
            
            & > img{
            width:18px;
            height:18px;
            filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(100deg);
            }
          }
          & > button {
            background-color: ${colors.primary};
            border: none;
            padding: 0 1em;
            border-radius: 1em;
            color: #fff;
            font-weight: 100;
            cursor: pointer;
          }
          & > select {
            width: 15em;
            outline: none;
            border: none;
          }
          & > div {
            width: 10em;
            display: flex;
            flex-direction: column;
            white-space: nowrap; /* Evita que el texto se divida en múltiples líneas */
            overflow: hidden; /* Oculta el texto que excede el ancho del contenedor */
            text-overflow: ellipsis;
          }
          & > section {
            display: flex;
            gap: 1em;
            padding: 0.2em 1em;
            & > img {
              width: 30px;
              height: 30px;
              border-radius: 30%;
              cursor: pointer;
            }
            & > div {
              & > p:nth-child(2) {
                color: #0005;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
`;