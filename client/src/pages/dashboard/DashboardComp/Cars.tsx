import React from "react";
import { CasrStyle } from "../../../styles/compStyleDash";
import img from "../../..//assets/dash/img.jpg";
import strella from "../../..//assets/dash/strella.svg";
import { carsDataDash } from "../../../data/carsdata";
const Cars = () => {
  return (
    <CasrStyle>
      {carsDataDash.map((car) => (
        <div key={car.id}>
          <img src={car.img} alt="" />
          <article>
            <p>{car.description}</p>
            <em>{car.price}</em>
            <strong>
              <img src={strella} alt="" />
              {car.valoracion}
            </strong>
          </article>
        </div>
      ))}
    </CasrStyle>
  );
};

export default Cars;
