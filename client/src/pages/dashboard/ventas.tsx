import styled from "styled-components";
import { useGet } from "../../hook/useGet";
import { Venta } from "../../interfaces/venta";
import { Section, Tr } from "../../styles/compStyleDash";
import toast from "react-hot-toast";
import { formatFecha } from "../../utilities/formatDate";
import { useUser } from "../../context/useUser";
import { useState } from "react";
import * as XLSX from 'xlsx'; // Importar la biblioteca XLSX
import { Divtabla } from "../../styles/compStyle";

const Ventas = () => {
  const { user } = useUser();
  const { res } = useGet<Venta[]>(`venta/completado/${user?.id}`);
  const hora = new Date().toLocaleTimeString();
  const crearExcel = (venta: Venta, total: any) => {
   
    
    const informacionAdicional = {
      A: `Creado por ${user?.nombre}, el ${hora}`,
    }
    let tabla = [
      {
        AC: "Usuario",
        AD: "Total",
        AE: "Fecha de venta",
        A: "Nº",
        B: "Producto",
        C: "Precio unitario",
        D: "Cantidad",
       
      },
    ];
    venta?.detalles.map((detalle, i) => {
      const total = detalle.precioUnitario*detalle.cantidad;
      tabla.push({
      
        AC:String(venta.usuario.nombre),
        AD:String(total),
        AE:String(formatFecha(venta.fecha)),
        A: String(i + 1),
        B: String(detalle.productoActivo.producto.nombre),
        C: String(detalle.precioUnitario),
        D: String(detalle.cantidad),
  
      });
    });
    const dataFinal = [...titulo, ...tabla, informacionAdicional];
    setTimeout(() => {
      creadoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };

  const [loading, setLoading] = useState(false);
  const titulo = [{ A: "Reporte de Ventas realizada" }, {}];
  const informacionAdicional = {
    A: `Creado por ${user?.nombre}, el ${hora}`,
  }
  const longitud = [5, 35, 25, 20, 10, 10, 10];
  const handleDownload = () => {
    setLoading(true);
    let tabla = [
      {
        A: "Nº",
        B: "Usuario",
        C: "Total",
        D: "Fecha de venta"
      },
    ];
    res?.data.map((venta) => {
      tabla.push({
        A: String(venta.id),
        B: String(venta.usuario.nombre),
        C: String("80"),
        D: String(venta.fecha),
      });
    });
    const dataFinal = [...titulo, ...tabla, informacionAdicional];

    setTimeout(() => {
      creadoArchivo(dataFinal);
      setLoading(false);
    }, 1000);
  };
  const creadoArchivo = (dataFinal: any[]) => {
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });
    hoja["!merges"] = [
      XLSX.utils.decode_range("A1:G1"),
      XLSX.utils.decode_range("A2:G2"),
      XLSX.utils.decode_range("A34:G34"),
    ];
    let propiedades: { width: number }[] = [];
    longitud.forEach((col) => {
      propiedades.push({
        width: col,
      });
    });

    hoja["!cols"] = propiedades;
    XLSX.utils.book_append_sheet(libro, hoja, "Ventas");
    XLSX.writeFile(libro, "Venta.xlsx");
    toast.success("Descargando excel correctamente");
  }

  return (
    <Section>
      <article>
        <p>Ventas</p>
        <button onClick={handleDownload}>Excel</button>
      </article>
      <Divtabla>
      <table>
        <thead>
          <tr>
            <th>Usuario</th>
            <th className="mini">Ganancia</th>
            <th className="mini">Fecha de venta</th>
            <th className="mini">Reporte individual</th>
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
                <td>{formatFecha(venta.fecha)}</td>
                <td>
                  <button onClick={() => crearExcel(venta, total)}>Excel</button>
                </td>
              </Tr>
            );
          })}
        </tbody>
      </table>
      </Divtabla>
    </Section>
  );
};
export default Ventas;
