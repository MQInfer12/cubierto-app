import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
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
import Dashboard from "./pages/dashboard/Dashboard";
import RoleRoute from "./components/roleRoute";
import Ventas from "./pages/dashboard/ventas";
import Ubicaciones from "./components/ubicaciones";
import Categorias from "./pages/categorias";
import Cola from "./pages/dashboard/cola";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OUTHID}>
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
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/Promociones" element={<Promociones />} />
              <Route path="/dashboard/Favoritos" element={<Favoritos />} />
              <Route path="/dashboard/ventas" element={<Ventas />} />
              <Route path="/dashboard/Perfil" element={<Perfil />} />
              <Route path="/dashboard/ubicaciones" element={<Ubicaciones />} />
              <Route path="dashboard/categorias" element={<Categorias/>}/>
              <Route path="dashboard/cola" element={<Cola/>}/>
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
