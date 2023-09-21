import React, { useEffect } from "react";
import { Content2 } from "../../styles/page2Style";
import verduras from "../../assets/page2/Frame 1.png";
const SectionAyuda = () => {
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
    <Content2 >
      <div className="hidden">
      <img src={verduras} alt="" />
      <div>
        <h3>¿De que manera se brinda nuestra ayuda?</h3>
        <p>
          Estamos comprometidos a marcar la diferencia en la lucha contra el
          desperdicio de alimentos. Creemos que cada pequeña acción cuenta, y a
          través de nuestra plataforma, hemos diseñado formas efectivas para que
          todos contribuyan a reducir el desperdicio de alimentos y promover
          prácticas de consumo sostenibles.
        </p>
      </div>
      </div>
     
    </Content2>
  );
};

export default SectionAyuda;
