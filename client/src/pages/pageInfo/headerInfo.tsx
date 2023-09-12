import React from "react";
import fondo from "../../assets/page2/Star 1.png";
import fondo1 from "../../assets/Fondo.png";
import burger from "../../assets/page2/burger slant.png";
import rabano from "../../assets/page2/pink strawberry.png";
import bebida from "../../assets/page2/pink soda can.png";
import { Page2 } from "../../styles/page2Style";

const HeaderInfo = () => {
  return (
    <Page2>
      <img src={fondo1} alt="" />
      <h2>Cubierto</h2>
      <section>
        <div>
          <h3>
            Elevando a nuestros <strong>héroes.</strong>
          </h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
            repellat delectus nostrum corporis eius asperiores minima quia.
            Quidem, consequuntur quae!
          </p>
        </div>
        <div>
          <img src={fondo} alt="fondo" />
          <img src={burger} alt="burger" />
          <img src={rabano} alt="rabano" />
          <img src={bebida} alt="bebida" />
        </div>
      </section>
    </Page2>
  );
};

export default HeaderInfo;
