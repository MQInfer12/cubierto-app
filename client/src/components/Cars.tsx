import { carsData } from "../data/carsdata.js";
import { CarsStyle } from "../styles/compStyle.js";
import { useEffect } from 'react';

const Cars = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      })
    });
    const hiddenCards = document.querySelectorAll(".hidden");
    hiddenCards.forEach(el => observer.observe(el));
  }, []);

  return (
    <CarsStyle>
      {carsData.map((car) => (
        <div className="hidden" key={car.id}>
          <img src={car.image} />         
          <h2>{car.name}</h2>
          <p>{car.description}</p>
        </div>
      ))}
    </CarsStyle>
  );
};

export default Cars;
