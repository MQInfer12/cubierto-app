import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Organizacion from "./pages/Organizacion";
import Estadisticas from "./pages/Estadisticas";
import Ofertas from "./pages/Ofertas";
import Register from "./pages/Login/Register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />} >
          <Route path="/" element={<Home />} />
          
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/organizacion" element={<Organizacion />} />
        <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
