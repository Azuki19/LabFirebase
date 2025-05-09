// UserProfile.js (Resumen del perfil)
import React from 'react';

const UserProfile = ({ userProfile, isProfileComplete }) => {
  return (
    <div>
      <h3>Resumen del perfil</h3>
      <p><strong>Correo electrónico:</strong> {userProfile.email}</p>
      <p><strong>Nombre de usuario:</strong> {userProfile.username}</p>
      <p><strong>Fecha de nacimiento:</strong> {userProfile.birthdate}</p>
      {/* Aquí mostramos la encuesta si el perfil no está completo */}
      {!isProfileComplete && <p>Perfil incompleto, por favor complete la encuesta a continuación.</p>}
    </div>
  );
};

export default UserProfile;
