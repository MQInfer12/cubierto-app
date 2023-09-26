import { styled } from "styled-components";
import { ComunStyles, buttonStyle, colors } from "./styleGlobal";
import { Link } from "react-router-dom";

export const Dash = styled.section`
  display: flex;
  flex-direction: row;
  width: 100vw;
  position: fixed;
  & > aside {
    display: none;
    & > #menuA {
      border-radius: 0;
      display: none;
      width: 30px;
      height: 30px;
    }
  }
  @media screen and (max-width: 720px) {
    z-index: 200;
    display: flex;
    flex-direction: column;
    position: relative;
    & > aside {
      display: block;
      background-color: ${colors.primary};
      padding: 0.5em 2em;
      box-shadow: 0 5px 10px #0005;
      z-index: 3;
      & > #menuA {
        border-radius: 0;
        display: block;
        width: 30px;
        height: 30px;
        filter: invert(1);
      }
    }
    & > nav {
      position: absolute;
      width: 80%;
      background-color: #fff;
      z-index: 100;
      & > #menuA {
        display: flex;
        position: absolute;
        top: 2em;
        right: 2em;
      }
    }
  }
`;

interface NavDashProps {
  active: boolean
}

export const NavDash = styled.nav<NavDashProps>`
  background-color: ${colors.light};
  width: 210px;
  height: 100vh;
  box-shadow: 0px 5px 5px #0005;
  padding: 40px;
  gap: 2em;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  @media screen and (max-width: 720px) {
    transition: transform 0.5s;
    transform: ${props => props.active ? "translateX(0)" : "translateX(-100%)"};
  }

  & > #menuA {
    border-radius: 0;
    display: none;
    width: 30px;
    height: 30px;
  }
  & > section {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${colors.gray900};
    & > p > img {
      width: 100px;
      object-fit: cover;
      height: auto;
      border-radius: 0;
      background-color: transparent;
    }
    & > img {
      width: 80px;
      border-radius: 50%;
      height: 80px;
    }
  }
  & p {
    color: ${colors.dark};
    font-weight: 700;
  }
  & h3 {
    font-weight: 400;
    font-size: 10px;
    width: 150px;
    word-wrap: break-word;
    color: ${colors.gray500};
  }
  & h2 {
    font-size: 16px;
    font-weight: 700;
  }
  & > section {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
  }
  & article {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }
`;
export const Linkdash = styled(Link)`
  text-decoration: none;
  width: 100%;
  display: flex;
  gap: 1em;
  font-size: 0.9em;
  color: ${colors.gray600};
  align-items: center;
  &:hover {
    color: ${colors.primary500};
    & img {
      filter: saturate(100);
    }
  }
  & > img {
    width: 16px;
    height: 16px;
  }
`;
// del lado de el dashbard
export const Dashbo = styled.section`
  display: flex;
  padding: 3em;
  padding-left: calc(210px + 3rem);
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
export const Section = styled.section`
  margin: 0 auto;
  padding: 2em;
  width: 80%;
  display: flex;
  gap: 3em;
  flex-direction: column;
  min-height: 100vh;

  @media screen and (max-width: 720px) {
    min-height: calc(100vh - 46px);
  }

  & > h4 {
    color: ${colors.gray500};
  }
  & article {
    ${ComunStyles}
    flex-direction:row;
    justify-content: space-between;
    & p {
      font-size: 2em;
      font-weight: bold;
      color: ${colors.gray900};
    }
    & > div {
      width: 40%;
      display: flex;
      justify-content: end;
      align-items: center;
      & > i {
        font-size: 18px;
      }
    }
    & > button {
      ${buttonStyle}
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        opacity: 0.8;
      }
    }
  }
  & > div > table {
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    background: ${colors.light};
    border-radius: 10px;
    table-layout: fixed;
    & > thead {
      & > tr {
        background-color: #e4e4e453;
        & > th {
          font-size: 12px;
          font-weight: 400;
          padding: 0.7em 1em;
          text-align: start;
          text-transform: uppercase;
          color: #0008;
        }
        & > .pequeno {
          width: 250px;
        }
        & > .mini {
          width: 180px;
        }
        & > .center {
          text-align: center;
        }
        & > .min {
          width: 300px;
        }
      }
    }
    & tbody {
      & > tr {
        transition: all 0.3s;
        &:hover {
          background-color: ${colors.bg};
        }
        & > button {
          color: #18c964;
          background: rgba(24, 201, 100, 0.2);
          border: none;
          padding: 0.2em 2em;
          margin: 0.5em;
          border-radius: 2em;
        }
        & > td {
          padding: 1em 1em;
          color: ${colors.gray900};

          &.min {
            overflow: hidden;
          }

          & > article {
            ${ComunStyles}
            justify-content:flex-start;
            gap: 1em;
            & > img {
              width: 18px;
              height: 18px;
              filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(100deg);
            }
          }
          & > button {
            background: rgba(24, 201, 100, 0.2);
            color: #18c964;
            border: none;
            padding: 0 1em;
            border-radius: 1em;
            font-weight: 400;
            cursor: pointer;
          }
          & > .buttonEliminar {
            background: transparent;
            filter: invert(70%) sepia(78%) saturate(6583%) hue-rotate(335deg)
              brightness(112%) contrast(81%);
          }
          & > i {
            font-size: 20px;
            color: ${colors.gray500};
          }
          & > select {
            background: transparent;
            outline: none;
            border: none;
            color: ${colors.gray900};
          }
          & > div {
            width: 10em;
            display: flex;
            flex-direction: column;
            white-space: nowrap;
            overflow: hidden;
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
  & aside {
    width: 70%;
    flex-direction: row;
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    & label {
      width: 20%;
    }
    & input {
      width: 70%;
      border: solid 1px #0005;
      padding: 0.5em;
      border-radius: 1em;
      outline: none;
    }
    & button,
    a {
      padding: 0.5em 2em;
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
      ${buttonStyle}
    }
  }
`;

export const Tr = styled.tr`
  margin: 1em;
  & > button {
    background: #18c964;
    border: none;
    padding: 0 1em;
    border-radius: 1em;
    color: #fff;
    font-weight: 400;
    cursor: pointer;
  }
`;
export const Inputfilter = styled.input`
  width: 50%;
  border: solid 1px ${colors.gray700};
  padding: 0.5em;
  border-radius: 1rem;
  outline: none;
  transition: width 0.2s ease-in-out;
  margin-right: 5px;
  transition: 0.5s;
  color: ${colors.gray600};
  &:focus {
    width: 80%;
  }
`;

export const CasrStyle = styled.div`
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  margin: 0 auto;
  & > div {
    box-shadow: 0 3px 10px 5px #0005;
    transition: all 0.5s ease-in-out;
    border-radius: 8px 8px 0px 0px;

    &:hover {
      transform: scale(1.1);
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
`;
