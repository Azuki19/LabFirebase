import React from 'react';
import { Link } from 'react-router-dom';
import FormLogin from '../../components/formLogin';
import './login.css';

function Login() {
  return (
    <section>
      <FormLogin></FormLogin>


      <section>
        <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </section>
    </section>
  );
}

export default Login;
