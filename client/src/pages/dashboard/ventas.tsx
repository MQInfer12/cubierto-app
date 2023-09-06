import styled from "styled-components";
import { useGet } from "../../hook/useGet";
import { Venta } from "../../interfaces/venta";
import { Section, Tr } from "../../styles/compStyleDash";
import { Toaster } from "react-hot-toast";
const Ventas = () => {
  const { res } = useGet<Venta[]>("venta/completado/117585476927134335712");

  return (
    <Section>
      <Toaster position="top-center" reverseOrder={false} />
      <article>
        <p>Ventas</p>
        <button>Excel </button>
      </article>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Ganancia</th>
            <th>Fecha de venta</th>
            <th>Reporte individual</th>
          </tr>
        </thead>
        <tbody>
          {res?.data.map((venta) => {
            const total = venta.detalles.reduce((suma, detalle) => {
              suma += detalle.cantidad * detalle.precioUnitario;
              return suma;
            }, 0);
            return (
              <Tr key={venta.id}>
               <td>
               <section>
                        <img src={venta.usuario.foto} alt="foto usuario " />{" "}
                        <div>
                            <p> {venta.usuario.nombre}</p>
                            <p>{venta.usuario.email}</p>
                           
                        </div>
                    </section>
               </td>
              
                <td> Total:{total}</td>
                <td>{venta.fecha}</td>
             <button>Excel</button>
              </Tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
};

export default Ventas;
const Container = styled.div`
  padding-left: calc(210px + 3rem);
`;
