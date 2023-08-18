import { styled } from "styled-components";
import { Stylecomun, fonts, sizes } from "./styleGlobal";

export const Aside = styled.aside`
  ${Stylecomun}
  padding:3em;
  & > h3 {
    font-size: 3rem;
    line-height: 4.5rem;
    ${fonts}
  }
  & > p {
    width: ${sizes.small};
    line-height: 1.5rem;
    text-align: justify;
  }
`;
export const SliderStyle = styled.article`
  display: flex;
  flex-direction: row;
  ${Stylecomun}
  justify-content:center;
  align-items: center;
  gap: 2rem;
`;
