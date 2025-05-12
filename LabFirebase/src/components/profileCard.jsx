// ProfileCard.js
import React from 'react';

const ProfileCard = ({ userProfile, isProfileComplete }) => {
  return (
    <section>
      <h3>Resumen del perfil</h3>
      <p><strong>Correo electrónico:</strong> {userProfile.email}</p>
      <p><strong>Nombre de usuario:</strong> {userProfile.username}</p>
      <p><strong>Fecha de nacimiento:</strong> {userProfile.birthdate}</p>

      {userProfile.avatar && <p><strong>Imagen de perfil:</strong> {userProfile.avatar}</p>}
      {userProfile.description && <p><strong>Descripción:</strong> {userProfile.description}</p>}
      {userProfile.interests && userProfile.interests.length > 0 && (
        <p><strong>Intereses:</strong> {userProfile.interests.join(', ')}</p>
      )}


      {!isProfileComplete && <p>Perfil incompleto. Por favor, completa la encuesta.</p>}
    </section>
  );
};

export default ProfileCard;
