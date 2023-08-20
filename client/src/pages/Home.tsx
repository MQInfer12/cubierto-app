import { Content } from "../styles/compStyle";
import Portada from "../assets/Comida-portada.png";
import Cars from "../components/Cars";
import Slyder from "../components/slyder";
import Footer from "../components/footer";
const Home = () => {
  return (
    <>
      <Content>
        <section>
          <h1>MY HEADING</h1>
          <p>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint.{" "}
          </p>
        </section>
        <img src={Portada} alt="Comida-portada.png" />
      </Content>
      <Cars />
      <Slyder />
      <Footer/>
    </>
  );
};

export default Home;
