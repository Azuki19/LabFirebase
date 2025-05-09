// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth'; // Importa signOut de Firebase
import { auth, db } from '../../services/firebaseConfig'; // Importa auth y db de Firebase
import { logoutUser } from '../../redux/userSlice'; // Acción de logout en Redux
import { doc, getDoc } from 'firebase/firestore'; // Funciones de Firestore

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uid, email } = useSelector((state) => state.user);
  const [userProfile, setUserProfile] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(true);
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState('');

  useEffect(() => {
    if (!uid) {
      navigate('/');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserProfile(data);
          setIsProfileComplete(data.avatar && data.description && data.interests.length > 0);
        } else {
          setError('No se encontraron los datos del usuario.');
        }
      } catch (err) {
        setError('Error al cargar el perfil: ' + err.message);
      } finally {
        setLoading(false); // Al finalizar la carga, cambiamos el estado
      }
    };

    fetchUserProfile();
  }, [uid, navigate]);

  // Función de logout
  const handleLogout = async () => {
    try {
      // Cerrar sesión en Firebase
      await signOut(auth);

      // Limpiar estado global de Redux
      dispatch(logoutUser());

      // Eliminar datos del usuario de localStorage
      localStorage.removeItem('user');

      // Redirigir al login
      navigate('/');
    } catch (err) {
      setError('Error al cerrar sesión: ' + err.message);
    }
  };

  // Muestra el contenido de carga o error
  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {/* Botón de logout */}
      <button onClick={handleLogout}>Cerrar sesión</button> {/* Botón de logout */}
      <div>
        {userProfile ? (
          <>
            {isProfileComplete ? (
              <div>
                <h3>Resumen del perfil</h3>
                <p><strong>Correo electrónico:</strong> {email}</p>
                <p><strong>Nombre de usuario:</strong> {userProfile.username}</p>
                <p><strong>Fecha de nacimiento:</strong> {userProfile.birthdate}</p>
                <p><strong>Descripción:</strong> {userProfile.description}</p>
                <p><strong>Intereses:</strong> {userProfile.interests.join(', ')}</p>
                <p><strong>Imagen de perfil:</strong> {userProfile.avatar}</p>
              </div>
            ) : (
              <div>
                <h3>Completa tu perfil</h3>
                {/* Aquí puedes tener la encuesta para completar el perfil */}
              </div>
            )}
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
