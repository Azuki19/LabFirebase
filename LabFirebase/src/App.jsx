// App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import store from './redux/store';
import { setUser, logoutUser } from './redux/userSlice';
import { auth } from './services/firebaseConfig'; // Importa auth de firebase
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import PrivateRoute from './components/privateRoute'; // Protege solo las rutas necesarias
import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay datos de usuario en `localStorage` y restaurar sesión
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      store.dispatch(setUser(user)); // Restaurar el usuario en Redux
      navigate('/dashboard'); // Redirigir al dashboard si ya está autenticado
    }

    // Listener para verificar el estado de autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si hay un usuario autenticado, guardamos sus datos en Redux
        store.dispatch(setUser({ uid: user.uid, email: user.email }));
        localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email })); // Guardar en localStorage
        navigate('/dashboard');
      } else {
        // Si no hay un usuario autenticado, limpiamos el estado global y localStorage
        store.dispatch(logoutUser());
        localStorage.removeItem('user');
        navigate('/');
      }
    });

    // Limpiamos el listener al desmontar el componente
    return () => unsubscribe();
  }, [navigate]);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Provider>
  );
}

export default App;
