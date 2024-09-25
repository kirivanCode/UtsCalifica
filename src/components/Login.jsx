import React, { useState } from "react";
import ImageProfile from '../images/perfil_ivan.png';
import '../styles/Login.css';
import appFirebase from '../conexion/credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

const Login = () => {
  const [registrando, setRegistrando] = useState(false);

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    try {
      if (registrando) {
        await createUserWithEmailAndPassword(auth, correo, contraseña);
      } else {
        await signInWithEmailAndPassword(auth, correo, contraseña);
      }
    } catch (error) {
      alert(registrando ? "Asegúrese que la contraseña tenga más de 8 caracteres" : "El correo o la contraseña son incorrectos");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="card">
        <h2 className="login-title">¡UTS CALIFICA!</h2>
          <img src={ImageProfile} alt="Profile" className="profile-image" />
          <form onSubmit={functAutenticacion}>
            <input type="text" placeholder='Ingrese el usuario' className="input-field" id="email" required />
            <input type="password" placeholder='Ingrese la contraseña' className="input-field" id="password" required />
            <button className="submit-button">{registrando ? "Regístrate" : "Inicia Sesión"}</button>
          </form>
          <div className="switch-text">
            {registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            <button className="switch-button" onClick={() => setRegistrando(!registrando)}>
              {registrando ? "Inicia Sesión" : "Regístrate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
