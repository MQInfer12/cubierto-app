import fondo from "../../assets/page2/Star 1.png";
import fondo1 from "../../assets/Fondo.png";
import burger from "../../assets/page2/burger slant.png";
import rabano from "../../assets/page2/pink strawberry.png";
import bebida from "../../assets/page2/pink soda can.png";
import { Page2 } from "../../styles/page2Style";

const HeaderInfo = ({ text }: { text: string }) => {
  return (
    <Page2>
      <img src={fondo1} alt="" />
      <section>
        <div>
          <h1>
            Productos de calidad, precios
            <br />
            <strong>
              {text.split("").map((letter, index) => (
                <span key={index} style={{ animationDelay: `${index * 0.9}s` }}>
                  <strong> {letter}</strong>
                </span>
              ))}
            </strong>
          </h1>
          <p>
            Pide y recoge las mejores ofertas de restaurantes de toda la ciudad que trabajan en conjunto con nosotros para brindarte
            sus mejores productos al mejor precio.
          </p>
        </div>
        <div className="cars">
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
