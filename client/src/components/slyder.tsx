import { Aside, Section, SliderStyle, SlyderImg } from "../styles/slyderStyle";
import { imagedata } from "../data/slylderdata";
import styled from "styled-components";
import { ComunStyles, colors } from "../styles/styleGlobal";
import { useState, useEffect } from 'react';

const Slyder = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(old => (old + 1) % imagedata.length);
    }, 4000);
    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <>
      <Section>
        <Aside>
          <h3>Nuestra gastronomía</h3>
          <div key={active}>
            <h2>Pique macho</h2>
            <p>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
              sint. Velit officia consequat duis enim velit mollit. Exercitation
              veniam consequat sunt nostrud amet.
            </p>
          </div>
        </Aside>
        <SliderStyle>
          {imagedata.map((imagen, i) => (
            <SlyderImg 
              src={imagen.image} 
              key={imagen.id} 
              active={active === i}
            />
          ))}
        </SliderStyle>
      </Section>
      <Card>
        <Cardownload>
          <div>
            <div>
              <h2>Nuestra aplicación</h2>
              <p>Descarga nuestra aplicación desde tu tienda favorita</p>
            </div>
            <section>
              <button>App Store</button>
              <button>Google Play</button>
            </section>
          </div>
        </Cardownload>
      </Card>
    </>
  );
};

export default Slyder;
const Card=styled.div`
  width: 100vw;
  height: 50vh;
  ${ComunStyles}
`
export const Cardownload = styled.section`
  width: 932px;
  height: 160px;
  border-radius: 16px;
  gap: 10px;
  background: #d04e4b;
  display: flex;
  align-items: center;
  padding: 20px;

  & > div {
    width: 892px;
    gap: 73px;
    display: flex;
    flex-direction: row;
    & > div {
      width: 361px;
      & > h2 {
        font-weight: 700;
        font-size: 24px;
        line-height: 36px;
        color: #e4eaf1;
      }
      & > p {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #e4eaf1;
      }
    }
    & > section {
      gap: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > button {
        width: 216px;
        height: 40px;
        gap: 10px;
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
        border: none;
      }
    }
  }
`;
