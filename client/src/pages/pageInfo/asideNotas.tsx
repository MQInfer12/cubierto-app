import React from "react";
import { AsideNotasStyle } from "../../styles/page2Style";
import imgnotas from "../../assets/Frame 6.png";
const AsideNotas = () => {
  return (
    <AsideNotasStyle>
      <h3>Nuestras notas</h3>
      <div>
        <img src={imgnotas} alt="" />
        <section>
          <p>
            En colaboración con nuestros aliados, trabajamos incansablemente
            para reducir el desperdicio de alimentos y construir puentes entre
            proveedores y consumidores, creando un mundo más sostenible y menos
            hambriento.
          </p>
          <strong>Ing. en sistemas</strong>
        </section>
      </div>
    </AsideNotasStyle>
  );
};

export default AsideNotas;
