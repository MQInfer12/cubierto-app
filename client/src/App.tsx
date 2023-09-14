import {  Routes, Route, HashRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import QuienesSomos from "./pages/quienesSomos";
import Organizacion from "./pages/organizacion";
import Estadisticas from "./pages/estadisticas";
import Ofertas from "./pages/ofertas";
import Register from "./pages/login/register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectRoute from "./components/protectRoute";
import Usuarios from "./pages/dashboard/usuarios";
import Dashnav from "./pages/dashboard/navDash/dashNav";
import DatosNavDash from "./pages/dashboard/navDash/datosNavDash";
import Promociones from "./pages/dashboard/promociones";
import Favoritos from "./pages/dashboard/favoritos";

import Perfil from "./pages/dashboard/perfil";
import RoleRoute from "./components/roleRoute";
import Ventas from "./pages/dashboard/ventas";
import Categorias from "./pages/categorias";
import Cola from "./pages/dashboard/cola";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OUTHID}>
        <Toaster position="top-center" reverseOrder={false}/>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/organizacion" element={<Organizacion />} />
              <Route path="/login" element={<Register />} />
            </Route>
            <Route path="/estadisticas" element={<Estadisticas />} />
          </Routes>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectRoute>
                  <Dashnav>
                    <DatosNavDash />
                  </Dashnav>
                </ProtectRoute>
              }
            >
              <Route path="/dashboard/Promociones" element={<Promociones />} />
              <Route path="/dashboard/Favoritos" element={<Favoritos />} />
              <Route path="/dashboard" element={<Ventas />} />
              <Route path="/dashboard/Perfil" element={<Perfil />} />
              <Route path="dashboard/categorias" element={<Categorias />} />
              <Route path="dashboard/cola" element={<Cola />} />
              <Route path="/dashboard/usuario" element={
                <RoleRoute roles={['admin']}>
                  <Usuarios />
                </RoleRoute>} />
            </Route>
          </Routes>
        </HashRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
