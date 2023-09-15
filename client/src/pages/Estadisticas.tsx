
import Footer from "../components/footer";
import { Content2 } from "../styles/page2Style";
import AsideNotas from "./pageInfo/asideNotas";
import Fraces from "./pageInfo/fraces";
import HeaderInfo from "./pageInfo/headerInfo";
import SectionAliados from "./pageInfo/sectionAliados";
import SectionAyuda from "./pageInfo/sectionAyuda";

const Estadisticas = () => {
  return (
    <>
      <HeaderInfo text="inigualables." />
   <SectionAyuda/>
   <Fraces/>
   <SectionAliados/>
   <AsideNotas/>
   
   <Footer />

    </>
  );
};

export default Estadisticas;
