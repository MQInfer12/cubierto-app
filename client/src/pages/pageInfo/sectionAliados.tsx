import React from "react";
import { SectionAliadosStyle } from "../../styles/page2Style";
import fondo1 from "../../assets/Fondo.png";

const SectionAliados = () => {
  return (
    <SectionAliadosStyle>
      <img src={fondo1} alt="" />
      <article>
          <h3>
           Nuetros <strong>aliados.</strong>
          </h3>
     <aside>
     <div> </div>
        <div> </div>
        <div> </div>
        <div> </div>
     </aside>
      </article>
    </SectionAliadosStyle>
  );
};

export default SectionAliados;
