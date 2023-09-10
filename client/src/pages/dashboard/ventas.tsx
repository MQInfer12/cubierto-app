import styled from "styled-components";
import { useGet } from "../../hook/useGet";
import { Venta } from "../../interfaces/venta";
import { Section, Tr } from "../../styles/compStyleDash";
import toast, { Toaster } from "react-hot-toast";
import { formatFecha } from "../../utilities/formatDate";
import { useUser } from "../../context/useUser";
import { useState } from "react";
import * as XLSX from 'xlsx'; // Importar la biblioteca XLSX

const Ventas = () => {
  const { user } = useUser();
  const { res } = useGet<Venta[]>(`venta/completado/${user?.id}`);
  const hora = new Date().toLocaleTimeString();
  const crearExcel = (venta: Venta, total: any) => {
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet([
      ["Venta"],
      ["Usuario", venta.usuario.nombre],
      ["Total", total],
      ["Detalle Venta",venta.detalles.map((detalle)=>( detalle.productoActivo))],
      ["Fecha de venta", venta.fecha],
    ]);
    if (hoja?.["!cols"]) {
      for (let i = 0; i < hoja["!cols"].length; i++) {
        hoja["!cols"][i].wch = 15;
      }
    }
    XLSX.utils.book_append_sheet(libro, hoja, "Venta");
    XLSX.writeFile(libro, "Venta.xlsx");
  };


  const [loading, setLoading] = useState(false);
  const titulo = [{ A: "Reporte de Ventas realizada" }, {}];
  const informacionAdicional = {
    A: "Creado por: Josh, 04 de septiembre 2023 ",
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
  }

  return (
    <Section>
      <Toaster position="top-center" reverseOrder={false} />
      <article>
        <p>Ventas</p>
        <button onClick={handleDownload}>Excel</button>
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
                <td>{formatFecha(venta.fecha)}</td>
                <td>
                  <button onClick={() => crearExcel(venta, total)}>Excel</button>
                </td>
              </Tr>
            );
          })}
        </tbody>
      </table>
    </Section>
  );
};
export default Ventas;
