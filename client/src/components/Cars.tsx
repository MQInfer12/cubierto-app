import { carsData } from "../data/carsdata.js";
import { CarsStyle } from "../styles/compStyle.js";
const Cars = () => {
  return (
    <CarsStyle>
      {carsData.map((car) => (
        <div key={car.id}>
          <img src={car.image} />         
          <h2>{car.name}</h2>
          <p>{car.description}</p>
        </div>
      ))}
    </CarsStyle>
  );
};

export default Cars;
