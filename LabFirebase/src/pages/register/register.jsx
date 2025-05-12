import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/formRegister';

function Register() {
  return (
    <section>
      <h1>SOY REGISTER</h1>
      <RegisterForm></RegisterForm>


      <section>
        <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link></p>
      </section>
    </section>
  );
}

export default Register;
