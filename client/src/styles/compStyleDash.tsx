import { styled } from "styled-components";
import { ComunStyles, colors } from "./styleGlobal";
import { Link } from "react-router-dom";



export const Dash = styled.section`
  display: flex;
flex-direction:row;

`;

export const NavDash = styled.nav`
  background-color: ${colors.light};
  width: 210px;
  height: 100vh;
  box-shadow: 0px 5px 5px #0005;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  text-align: center;
  padding: 40px;
  gap: 10em;
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
  ${ComunStyles}
  flex-direction:row;
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
