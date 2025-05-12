// App.js
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import store from './redux/store';
import { setUser, logoutUser } from './redux/userSlice';
import { auth } from './services/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Dashboard from './pages/dashboard/dashboard';
import PrivateRoute from './components/privateRoute';
import './App.css';

function App() {
  const navigate = useNavigate();

  useEffect(() => {

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      store.dispatch(setUser(user));
      navigate('/dashboard');
    }


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        store.dispatch(setUser({ uid: user.uid, email: user.email }));
        localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }));

        if (window.location.pathname === '/register' || window.location.pathname === '/login') {
          navigate('/dashboard');
        }
      } else {

        store.dispatch(logoutUser());
        localStorage.removeItem('user');

        if (window.location.pathname !== '/register') {
          navigate('/');
        }
      }
    });


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
