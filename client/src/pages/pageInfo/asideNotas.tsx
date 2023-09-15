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
            Lorem ipsum dolor sit amet consectetur. Laoreet pellentesque quis ut
            nisl amet. Consequat neque eu sit cursus ac lectus amet iaculis.
            Diam volutpat pretium rhoncus in.
          </p>
          <strong>Jhon</strong>
        </section>
      </div>
    </AsideNotasStyle>
  );
};

export default AsideNotas;
