// ProfileCompletion.js (Encuesta para completar el perfil)
import React, { useState } from 'react';

const ProfileCompletion = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState('');
  const [interests, setInterests] = useState([]);
  const [error, setError] = useState('');

  const handleAvatarSelect = (selectedAvatar) => {
    setAvatar(selectedAvatar);
  };

  const handleInterestChange = (interest) => {
    setInterests((prevInterests) =>
      prevInterests.includes(interest)
        ? prevInterests.filter((i) => i !== interest)
        : [...prevInterests, interest]
    );
  };

  const handleNextStep = () => {
    if (step === 1 && !avatar) {
      setError('Selecciona un avatar');
      return;
    }
    if (step === 2 && !description) {
      setError('Escribe una descripción');
      return;
    }
    if (step === 3 && interests.length === 0) {
      setError('Selecciona al menos un interés');
      return;
    }

    setError('');
    if (step < 3) {
      setStep(step + 1); // Avanzar al siguiente paso
    } else {
      // Al finalizar la encuesta, guardar los datos y marcar el perfil como completo
      onComplete({ avatar, description, interests });
    }
  };

  return (
    <div>
      <h3>Completa tu perfil</h3>
      {step === 1 && (
        <div>
          <h4>Selecciona tu imagen de perfil</h4>
          <button onClick={() => handleAvatarSelect('avatar1')}>Avatar 1</button>
          <button onClick={() => handleAvatarSelect('avatar2')}>Avatar 2</button>
          <button onClick={() => handleAvatarSelect('avatar3')}>Avatar 3</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h4>Escribe una descripción personal</h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribe algo sobre ti..."
          ></textarea>
        </div>
      )}
      {step === 3 && (
        <div>
          <h4>Selecciona tus intereses personales</h4>
          <label>
            <input
              type="checkbox"
              value="arte"
              checked={interests.includes('arte')}
              onChange={() => handleInterestChange('arte')}
            />
            Arte
          </label>
          <label>
            <input
              type="checkbox"
              value="ciencia"
              checked={interests.includes('ciencia')}
              onChange={() => handleInterestChange('ciencia')}
            />
            Ciencia
          </label>
          <label>
            <input
              type="checkbox"
              value="tecnología"
              checked={interests.includes('tecnología')}
              onChange={() => handleInterestChange('tecnología')}
            />
            Tecnología
          </label>
          <label>
            <input
              type="checkbox"
              value="juegos"
              checked={interests.includes('juegos')}
              onChange={() => handleInterestChange('juegos')}
            />
            Juegos
          </label>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleNextStep}>
        {step < 3 ? 'Siguiente' : 'Guardar perfil'}
      </button>
    </div>
  );
};

export default ProfileCompletion;
