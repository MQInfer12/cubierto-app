import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Organizacion from "./pages/Organizacion";
import Estadisticas from "./pages/Estadisticas";
import Ofertas from "./pages/Ofertas";
import Register from "./pages/Login/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Pedir from "./pages/dashboard/Pedir";
import ProtectRoute from "./components/ProtectRoute";
import Usuarios from "./pages/dashboard/Usuarios";


function App() {
  console.log(import.meta.env.VITE_OUTHID);
  return (

    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OUTHID}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/estadisticas" element={<Estadisticas />} />
              <Route path="/organizacion" element={<Organizacion />} />
              <Route path="/login" element={<Register />} />
              <Route path="/pedir" element={
                <ProtectRoute>
                  <Usuarios />
                  
                </ProtectRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
