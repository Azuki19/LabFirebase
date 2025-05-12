import React from 'react';
import { Link } from 'react-router-dom';
import FormLogin from '../../components/formLogin';

function Login() {
  return (
    <section>
      <h1>SOY login</h1>
      <FormLogin></FormLogin>


      <section>
        <p>No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </section>
    </section>
  );
}

export default Login;
