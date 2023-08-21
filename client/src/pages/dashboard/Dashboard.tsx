import React from "react";
import Busqueda from "./DashboardComp/Busqueda";
import { Dashbo } from "../../styles/compStyleDash";
import Cars from "./DashboardComp/Cars";

const Dashboard = () => {
  return (
    <Dashbo>
      <Busqueda />
      <article>
        <h2>Solamente las mejores promociones!</h2>
        <p>Las nuevas promos de hoy</p>
      </article>
      <Cars/>
    </Dashbo>
  );
};

export default Dashboard;
