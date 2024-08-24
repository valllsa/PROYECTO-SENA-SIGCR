import React from 'react';
import { useUser } from '../../../UserContext';
import { NavBar } from '../../../Components/Componentes_Propietario/navBar';
import SideBar from '../../../Components/Componentes_Propietario/sideBar';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="d-flex">
        {/* Removemos el SideBar para la vista de Perfil */}
        <div className="profile-container bg-light p-4 w-100">
          <h1 className="text-center">Perfil</h1>
          <p>Nombre: {user.Nombre}</p>
          <p>Teléfono: {user.Teléfono}</p>
          <p>Correo:{user.Correo}</p>
          <p>Numero Documento:{user.NumeroDocumento}</p>
          <p>Meses Atrasados: {user.MesesAtrasados}</p>
          <p>Espacios Parqueadero:{user.EspacioParqueadero}</p>
          <p>Código Vivienda: {user.CodigoVivienda}</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
