import React, { useState } from "react";
import ImageProfile from '../images/perfil_ivan.png';
import '../styles/Login.css';
import appFirebase from '../conexion/credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase); // Firestore

const Login = () => {
  const [registrando, setRegistrando] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState('usuario'); // Rol por defecto
  const [cargando, setCargando] = useState(false); // Estado para mostrar carga

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    
    setCargando(true); // Mostrar spinner o mensaje de carga
    try {
      if (registrando) {
        // Registro de usuario
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
        const usuario = userCredential.user;

        // Obtener el UID del rol seleccionado
        let rolId;
        switch (rolSeleccionado) {
          case 'profesor':
            rolId = '6RSVFqsXdvPUAd5gLEZO';
            break;
          case 'administrador':
            rolId = 'fSyz08YcoklpJBaKWjlZ';
            break;
          default:
            rolId = 'iMx3SDTJ0zAM5CVAe62i'; // Usuario por defecto
        }

        // Guardar el rol en Firestore
        await setDoc(doc(db, "usuarios", usuario.uid), {
          correo: correo,
          rol: rolSeleccionado,
          rolId: rolId // Guardamos también el UID del rol
        });

        // Mostrar mensaje de registro exitoso
        alert("Registro exitoso. Ahora puede iniciar sesión.");

        // Opcional: Mantener al usuario conectado después del registro.
        // O redirigir a otra página de bienvenida.
        setRegistrando(false); // Cambiar a modo de inicio de sesión

      } else {
        // Inicio de sesión
        await signInWithEmailAndPassword(auth, correo, contraseña);
        alert("Inicio de sesión exitoso");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      const errorMessage = error.message;
      if (registrando) {
        alert("Error en el registro: " + errorMessage);
      } else {
        alert("El correo o la contraseña son incorrectos: " + errorMessage);
      }
    } finally {
      setCargando(false); // Ocultar spinner o mensaje de carga
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="card">
          <h2 className="login-title">¡UTS CALIFICA!</h2>
          <img src={ImageProfile} alt="Profile" className="profile-image" />
          <form onSubmit={functAutenticacion}>
            <input type="text" placeholder="Ingrese el usuario" className="input-field" id="email" required />
            <input type="password" placeholder="Ingrese la contraseña" className="input-field" id="password" required />

            {/* Mostrar selección de roles solo si el usuario se está registrando */}
            {registrando && (
              <div className="role-selection">
                <label>Seleccione su rol:</label>
                <select 
                  className="input-field" 
                  value={rolSeleccionado} 
                  onChange={(e) => setRolSeleccionado(e.target.value)}
                >
                  <option value="usuario">Usuario</option>
                  <option value="profesor">Profesor</option>
                  <option value="administrador">Administrador</option>
                </select>
              </div>
            )}

            <button className="submit-button" disabled={cargando}>
              {cargando ? "Cargando..." : registrando ? "Regístrate" : "Inicia Sesión"}
            </button>
          </form>
          <div className="switch-text">
            {registrando ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
            <button className="switch-button" onClick={() => setRegistrando(!registrando)} disabled={cargando}>
              {registrando ? "Inicia Sesión" : "Regístrate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


