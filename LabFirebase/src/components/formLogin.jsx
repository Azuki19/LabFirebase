// FormLogin.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';
import '../pages/login/login.css'

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;


      dispatch(setUser({ uid: user.uid, email: user.email }));


      localStorage.setItem('user', JSON.stringify({ uid: user.uid, email: user.email }));


      navigate('/dashboard');
    } catch (err) {
      setError('Error al iniciar sesión: ' + err.message);
    }
  };

  return (
    <section>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <label>Correo electrónico</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </section>
        <section>
          <label>Contraseña</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </section>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Iniciar sesión</button>
      </form>
    </section>
  );
};

export default FormLogin;
