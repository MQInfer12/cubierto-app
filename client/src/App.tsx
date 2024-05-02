import { Routes, Route, HashRouter } from "react-router-dom";
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
import Perfil from "./pages/dashboard/Perfil";
import RoleRoute from "./components/roleRoute";
import Ventas from "./pages/dashboard/ventas";
import Categorias from "./pages/categorias";
import Cola from "./pages/dashboard/cola";
import { Toaster } from "react-hot-toast";
import Politicas from "./pages/politicas";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OUTHID}>
        <Toaster position="top-center" reverseOrder={false} />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Home />} />
              <Route path="/estadisticas" element={<Estadisticas />} />
              <Route path="/login" element={<Register />} />
              <Route path="/politicas" element={<Politicas />} />
            </Route>
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
              <Route
                path="/dashboard/usuario"
                element={
                  <RoleRoute roles={["admin"]}>
                    <Usuarios />
                  </RoleRoute>
                }
              />
            </Route>
          </Routes>
        </HashRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
