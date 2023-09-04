import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";

import { GoogleOAuthProvider } from "@react-oauth/google";

import RoleRoute from "./components/roleRoute";
<<<<<<< HEAD
import Home from "./pages/Home";
import Ofertas from "./pages/Ofertas";
import QuienesSomos from "./pages/QuienesSomos";
import Estadisticas from "./pages/Estadisticas";
import Organizacion from "./pages/Organizacion";
import Register from "./pages/Login/Register";
import ProtectRoute from "./components/ProtectRoute";
import Usuarios from "./pages/dashboard/Usuarios";
import Dashnav from "./pages/dashboard/NavDash/DashNav";
import DatosNavDash from "./pages/dashboard/NavDash/DatosNavDash";
import Dashboard from "./pages/dashboard/Dashboard";
import Promociones from "./pages/dashboard/Promociones";
import Favoritos from "./pages/dashboard/Favoritos";
import Pedidos from "./pages/dashboard/Pedidos";
import Perfil from "./pages/dashboard/Perfil";
=======
import Ventas from "./pages/dashboard/ventas";
>>>>>>> a1b2bb95c5b549fc548f387d612c661e74a4feb0

function App() {
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
              <Route path="/dashboard/ventas" element={<Ventas />} />
              <Route path="/dashboard/Perfil" element={<Perfil />} />
<<<<<<< HEAD
              <Route path="/dashboard/Usuarios" element={<Usuarios />} />

=======
>>>>>>> a1b2bb95c5b549fc548f387d612c661e74a4feb0
              <Route path="/dashboard/usuario" element={
                <RoleRoute roles={['admin']}>
                  <Usuarios />
                </RoleRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
