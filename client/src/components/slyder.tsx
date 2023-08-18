import { Aside, SliderStyle } from "../styles/slyderStyle";
import { imagedata } from "../data/slylderdata";
import styled from "styled-components";
import { ComunStyles, colors } from "../styles/styleGlobal";

const Slyder = () => {
  return (
    <>
      <Aside>
        <h3>Meet our organization</h3>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit. Exercitation
          veniam consequat sunt nostrud amet.
        </p>
      </Aside>
      <SliderStyle>
        {imagedata.map((imagen) => (
          <div key={imagen.id}>
            <img src={imagen.image} />
          </div>
        ))}
      </SliderStyle>
      <Card>
        <Cardownload>
          <div>
            <div>
              <h2>Download the APP</h2>
              <p>Amet minim mollit non deserunt ullamco est.</p>
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
  padding: 50px 20px;
  gap: 10px;
  background: #d04e4b;

  & > div {
    width: 892px;
    height: 60px;
    gap: 73px;
    display: flex;
    flex-direction: row;
    & > div {
      width: 361px;
      height: 60px;
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
