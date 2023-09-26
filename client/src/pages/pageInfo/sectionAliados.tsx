import React from "react";
import { SectionAliadosStyle } from "../../styles/page2Style";
import fondo1 from "../../assets/Fondo.png";

const SectionAliados = () => {
  // Datos de tus aliados (esto puede provenir de tu base de datos o de un servicio)
  const aliados = [
    { nombre: "Unifranz", carrera: "de todo el país" },
    { nombre: "Ingeniería de Sistemas", carrera: "innovadores" },
    { nombre: "Administración de Empresas", carrera: "emprendedores" },
    { nombre: "Publicidad y Marketing", carrera: "creativos" },
  ];

  return (
    <SectionAliadosStyle>
      <img src={fondo1} alt="Fondo" />
      <article>
        <h3>
          Nuestro <strong>equipo.</strong>
        </h3>
        <aside>
          {aliados.map((aliado, index) => (
            <div key={index}>
              <h2>{aliado.nombre}</h2>
              <p>Ofreciendo oportunidades a estudiantes {aliado.carrera}</p>
            </div>
          ))}
        </aside>
      </article>
    </SectionAliadosStyle>
  );
};

export default SectionAliados;
