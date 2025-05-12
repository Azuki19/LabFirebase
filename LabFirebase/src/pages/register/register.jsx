import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../../components/formRegister';
import './register.css';

function Register() {
  return (
    <section>
      
      <RegisterForm></RegisterForm>


      <section>
        <p>¿Ya tienes una cuenta? <Link to="/">Inicia sesión aquí</Link></p>
      </section>
    </section>
  );
}

export default Register;
