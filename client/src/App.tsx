import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Organizacion from "./pages/Organizacion";
import Estadisticas from "./pages/Estadisticas";
import Ofertas from "./pages/Ofertas";
import Register from "./pages/Login/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectRoute from "./components/ProtectRoute";
import Usuarios from "./pages/dashboard/Usuarios";
import Dashnav from "./pages/dashboard/NavDash/DashNav";
import DatosNavDash from "./pages/dashboard/NavDash/DatosNavDash";
import Promociones from "./pages/dashboard/Promociones";
import Favoritos from "./pages/dashboard/Favoritos";
import Pedidos from "./pages/dashboard/Pedidos";
import Perfil from "./pages/dashboard/Perfil";
import Dashboard from "./pages/dashboard/Dashboard";
import Pedir from "./pages/dashboard/Pedir";

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
            </Route>
            <Route
              path="/pedir"
              element={
                <ProtectRoute>
                  <Usuarios />
                </ProtectRoute>
              }
            />
          </Routes>
        </BrowserRouter>

        <BrowserRouter>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <Dashnav>
                  <DatosNavDash />
                </Dashnav>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/Promociones" element={<Promociones />} />
              <Route path="/dashboard/Favoritos" element={<Favoritos />} />
              <Route path="/dashboard/Pedidos" element={<Pedidos />} />
              <Route path="/dashboard/Perfil" element={<Perfil />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
