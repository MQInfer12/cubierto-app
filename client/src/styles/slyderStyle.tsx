import { styled } from "styled-components";
import { colors, fonts, sizes } from "./styleGlobal";
import { slyder320 } from "./respStyle";

export const Section = styled.section`
  height: calc(100vh - 105px);
  display: flex;
  flex-direction: column;
 ${slyder320}
`;

export const Aside = styled.aside`
  color: ${colors.light};
  padding: 3em 7em;

  & > h3 {
    font-size: 3rem;
    line-height: 4.5rem;
    ${fonts}
  }
  & > div {
    animation: Aparecer 1s;

    & > h2 {
      font-size: 2.2rem;
      ${fonts}
    }
    & > p {
      width: ${sizes.small};
      line-height: 1.5rem;
      text-align: justify;
    }
  }
`;
export const SliderStyle = styled.article`
  display: flex;
  flex-direction: row;
  color: ${colors.light};
  justify-content: center;
  align-items: center;
  gap: 2rem;
  overflow: hidden;
  flex: 1;
`;

interface SlyderImgProps {
  active: boolean;
}

export const SlyderImg = styled.img<SlyderImgProps>`
  height: 100%;
  width: ${(props) => (props.active ? "240px" : "88px")};
  border-radius: 16px;
  object-fit: cover;
  filter: grayscale(${(props) => (props.active ? 0 : 1)});
  transition: all 0.5s;
`;
