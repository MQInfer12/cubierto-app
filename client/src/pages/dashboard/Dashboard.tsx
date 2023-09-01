import { useState } from "react";
import Busqueda from "./dashboardComp/busqueda";
import { Dashbo } from "../../styles/compStyleDash";
import Cars from "./dashboardComp/cars";
import { useGet } from "../../hook/useGet";
import { PedirResponse } from "../../interfaces/pages/pedir";

const Dashboard = () => {
  const { res } = useGet<PedirResponse>('pedir');
  const [categoriaselec, setCategoriaselec] = useState<number | null>(null);

  const seleccionarCategoria = (id: number) => {
    if (categoriaselec === id) {
      setCategoriaselec(null);
    } else {
      setCategoriaselec(id);
    }
  }
  return (
    <Dashbo>
      <Busqueda />
      <article>
        <h2>Solamente las mejores promociones!</h2>
        <p>Las nuevas promos de hoy</p>
      </article>
      {
        res?.data.categorias.map((cate) => (
          <button onClick={() => seleccionarCategoria(cate.id)}>
            {cate.nombre}
          </button>
        ))
      }
      <Cars ofertas={res?.data.ofertas.filter(oferta =>
        categoriaselec ? oferta.producto.categoriaId === categoriaselec : true
      )} />
    </Dashbo>
  );
};

export default Dashboard;
