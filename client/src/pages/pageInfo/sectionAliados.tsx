import React from "react";
import { SectionAliadosStyle } from "../../styles/page2Style";
import fondo1 from "../../assets/Fondo.png";

const SectionAliados = () => {
  // Datos de tus aliados (esto puede provenir de tu base de datos o de un servicio)
  const aliados = [
    { nombre: "Unifranz", carrera: "Ing sisemas" },
    { nombre: "Ingeniería de Sistemas", carrera: "Facultad de Innovación Tecnológica" },
    { nombre: "Administración de Empresas", carrera: "Facultad de Negocios y Emprendimiento" },
    { nombre: "Publicidad y Marketing", carrera: "Facultad de Comunicación y Creatividad" },
  ];

  return (
    <SectionAliadosStyle>
      <img src={fondo1} alt="Fondo" />
      <article>
        <h3>
          Nuestros <strong>aliados.</strong>
        </h3>
        <aside>
          {aliados.map((aliado, index) => (
            <div key={index}>
              <h2>{aliado.nombre}</h2>
              <p>Ofreciendo oportunidades a estudiantes de {aliado.carrera}</p>
            </div>
          ))}
        </aside>
      </article>
    </SectionAliadosStyle>
  );
};

export default SectionAliados;
