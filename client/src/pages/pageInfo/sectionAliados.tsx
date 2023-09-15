import React from "react";
import { SectionAliadosStyle } from "../../styles/page2Style";
import fondo1 from "../../assets/Fondo.png";

const SectionAliados = () => {
  return (
    <SectionAliadosStyle>
      <img src={fondo1} alt="" />
      <article>
        <h3>
          Nuestros <strong>aliados.</strong>
        </h3>
        <aside>
          <div> <h2>Unifranz</h2>
            <p>Lleno de capos en inges</p></div>
          <div><h2>Ingenieria de sistemas</h2><p>
            Lorem ipsum dolor sit amet.
          </p> </div>
          <div><h2>Administracion de empresas</h2>
            <p>Lorem ipsum dolor sit amet.</p> </div>
          <div> <h2>Publicidad y marketing</h2>
            <p>Lorem ipsum dolor sit amet.</p></div>
        </aside>
      </article>
    </SectionAliadosStyle>
  );
};

export default SectionAliados;
