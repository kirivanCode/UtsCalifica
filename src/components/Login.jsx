











import React, { useState } from "react";
import ImageProfile from '../images/perfil_ivan.png';
import '../styles/Login.css';
import appFirebase from '../conexion/credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

const Login = ({ setUsuario, setRol }) => {
  const [registrando, setRegistrando] = useState(false);
  const [rolSeleccionado, setRolSeleccionado] = useState('usuario');
  const [cargando, setCargando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(''); // Estado para el mensaje de éxito

  const functAutenticacion = async (e) => {
    e.preventDefault();
    const correo = e.target.email.value;
    const contraseña = e.target.password.value;
    
    setCargando(true);
    try {
      if (registrando) {
        const userCredential = await createUserWithEmailAndPassword(auth, correo, contraseña);
        const usuario = userCredential.user;

        let rolId;
        switch (rolSeleccionado) {
          case 'profesor':
            rolId = '6RSVFqsXdvPUAd5gLEZO';
            break;
          case 'administrador':
            rolId = 'fSyz08YcoklpJBaKWjlZ';
            break;
          default:
            rolId = 'iMx3SDTJ0zAM5CVAe62i';
        }

        await setDoc(doc(db, "usuarios", usuario.uid), {
          correo: correo,
          rol: rolSeleccionado,
          rolId: rolId
        });

        setUsuario(usuario);
        setRol(rolSeleccionado);
        setMensajeExito("Registro exitoso."); // Mostrar mensaje de éxito
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, correo, contraseña);
        const usuario = userCredential.user;
        const docRef = doc(db, "usuarios", usuario.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRol(docSnap.data().rol);
        } else {
          console.error("El documento no existe");
          alert("No se encontró la información de este usuario.");
        }
        setUsuario(usuario);
        setMensajeExito("Inicio de sesión exitoso."); // Mostrar mensaje de éxito
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      alert(registrando ? "Error en el registro: " + error.message : "El correo o la contraseña son incorrectos: " + error.message);
    } finally {
      setCargando(false);
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

          {/* Mostrar mensaje de éxito si existe */}
          {mensajeExito && (
            <div className="success-message">
              <p>{mensajeExito}</p>
            </div>
          )}

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


