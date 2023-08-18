import { styled } from "styled-components";
import { colors, ComunStyles, fonts, sizes, Stylecomun } from "./styleGlobal";
import { Link } from "react-router-dom";

export const ContentNavbar = styled.header`
  background-color: ${colors.trasparent};
  width: 90%;
  ${ComunStyles}
  justify-content:space-between;
  margin: 2rem auto 3rem auto;

  font-size: 20px;
  & > nav {
    width: 90%;
    ${ComunStyles}
    gap:2rem;
    font-weight: 400;
    font-size: 16px;
  }
`;
export const Links = styled(Link)`
  color: ${colors.light};
  text-decoration: none;
  font-weight: lighter;
`;
export const BtnRegister = styled(Link)`
  color: ${colors.light};
  text-decoration: none;
  font-size: 16px;
  font-weight: 300;
  background: linear-gradient(
    to right,
    ${colors.gr1},
    ${colors.gr2},
    ${colors.gr2}
  );
  padding: 0.5em 1.5rem;
  border-radius: 3rem;
  &:hover {
    background: linear-gradient(
      to right,
      ${colors.gr1},
      ${colors.gr1},
      ${colors.gr2}
    );
  }
`;
export const Content = styled.article`
  ${ComunStyles};
 ${Stylecomun}
  gap: 18rem;

  & > section {
    ${ComunStyles};
    flex-direction: column;
    gap: 1.5rem;
    width: ${sizes.small};
    color: #fff;
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
    height: 690px;
    object-fit: cover;
  }
`;

export const CarsStyle = styled.section`
  ${ComunStyles}
  width: 90%;
  margin: 3.5rem  auto;
  & > div {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    padding: 2em;
    gap: 1.5rem;
color:${colors.light};
& > p{
    font-size:1rem;
    font-weight:400;
    text-align:justify;
    line-height: 1.75rem;
}
& > h2{
    font-size:1.5rem;
    font-weight:200;
    line-height: 2.25rem;
}
    & > img {
      background-color: ${colors.light};
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
    }
  }
`;
