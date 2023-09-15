import { Contenedor, Content } from "../styles/compStyle";
import Portada from "../assets/Comida-portada.png";
import Slyder from "../components/slyder";
import Footer from "../components/footer";
import Cars from "../components/cars";

const Home = () => {
  return (
    <Contenedor>
      <Content>
        <section>
          <h1>CUBIERTO</h1>
          <p>
            ¡Disfruta de nuestra gastronomía cochabambina y ayudemos a no desperdiciar alimentos!
          </p>
        </section>
        <img src={Portada} alt="Comida-portada.png" />
      </Content>
      <Cars />
      <Slyder />
      <Footer />
    </Contenedor>
  );
};

export default Home;
