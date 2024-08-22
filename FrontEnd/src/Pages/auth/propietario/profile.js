import React from 'react';
import { useUser } from '../../../UserContext';

const Profile = () => {
  const { user } = useUser();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {user.Nombre}</p>
      <p>Teléfono: {user.Teléfono}</p>
      <p>Correo: {user.Correo}</p>
      <p>Numero Documento: {user.NumeroDocumento}</p>
      <p>Meses Atrasados: {user.MesesAtrasados}</p>
      <p>Espacios Parqueadero: {user.EspacioParqueadero}</p>
      <p>Código Vivienda: {user.CodigoVivienda}</p>
      
      <p></p>
    </div>
  );
};

export default Profile;

