import React from "react";
import { CasrStyle } from "../../../styles/compStyleDash";
import img from "../../..//assets/dash/img.jpg";
import strella from "../../../assets/dash/strella.svg";
import { carsDataDash } from "../../../data/carsdata";
import { ProductoActivo } from "../../../interfaces/productoActivo";

interface Props{
  ofertas:ProductoActivo[] | undefined
}
const Cars = ({ofertas}:Props) => {
  return (
    <CasrStyle>
      {ofertas?.map((car) => (
        <div key={car.id}>
          <img src={car.producto.foto} alt="" />
          <article>
            <p>{car.producto.nombre}</p>
            <em>Bs.{car.precioDescontado}</em>
          </article>
        </div>
      ))}
    </CasrStyle>
  );
};

export default Cars;
