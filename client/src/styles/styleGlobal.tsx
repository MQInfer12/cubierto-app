import { css } from "styled-components";

export const colors = {
  primary: "#0554F2",
  secondary: "#056CF2",
  gr1: "#27133A",
  gr2: "#31384F",
  light: "#fff",
  dark: "#191B3D",
  trasparent:"transparent",
};
export const fonts = css`
font-weight:900;
font-style:italic;
`;
export const sizes = {
  ssmall: "300px",
  small: "516px",
  medium: "768px",
  large: "992px",
  extraLarge: "1200px",
  modify: "50%",
};
export const ComunStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Stylecomun = css`
width:90%;
margin:auto;
color:${colors.light};

` ;