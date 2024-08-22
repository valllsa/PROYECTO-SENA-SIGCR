/* Importación de paquetes necesarios */
import React from "react"; /* Paquete necesario para manipular el estado del componente de clase MainAdmin */
/* Importación de iconos */
import { NavBar } from "../../../Components/Componentes_Admin/navBar";
import SideBar from "../../../Components/Componentes_Admin/sideBar";

/* Componente de clase MainAdmin */
export function MainAdmin() {
    return (
    <>
      <div className="d-flex flex-column vh-100">
        <div>
          <NavBar />
        </div>
        <div className="h-100">
          <SideBar />
        </div>
      </div>
    </>
  );
}
// }

export default MainAdmin; /* Sentencia para la exportación del modulo Main al archivo de rutas App.js */
