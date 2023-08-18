
import { Aside, SliderStyle } from '../styles/slyderStyle';
import { imagedata } from "../data/slylderdata";

const Slyder = () => {
  return (
    <>
      <Aside >
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

    </>
  );
};

export default Slyder;
