import React from "react";
import { Content2 } from "../../styles/page2Style";
import verduras from "../../assets/page2/Frame 1.png";
const SectionAyuda = () => {
  return (
    <Content2 className="hidden show">
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
    </Content2>
  );
};

export default SectionAyuda;
