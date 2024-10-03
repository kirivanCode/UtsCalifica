import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import appFirebase from './conexion/credenciales';

import Home from './components/Home';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProfesorCrud from './components/ProfesorCrud';
import Conocenos from './components/Conocenos';
import EstudianteCalificaciones from './components/EstudianteCalificaciones';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const auth = getAuth(appFirebase);
const db = getFirestore(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState(null); // Estado para el rol del usuario
  const [loading, setLoading] = useState(true); // Estado de carga para esperar a que se obtenga el rol

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        console.log("Usuario autenticado:", usuarioFirebase);
        setUsuario(usuarioFirebase);

        // Obtener rol del usuario desde Firestore
        const docRef = doc(db, "usuarios", usuarioFirebase.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Documento encontrado:", docSnap.data());
          setRol(docSnap.data().rol); // Guardar el rol en el estado
        } else {
          console.log("No se encontró el documento del usuario.");
          setRol(null); // Si no hay documento, no hay rol
        }
      } else {
        console.log("No hay usuario autenticado.");
        setUsuario(null);
        setRol(null); // Limpiar el rol cuando no hay usuario autenticado
      }
      setLoading(false); // Terminar la carga
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
      setRol(null); // Limpiar rol al cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Mientras se obtienen los datos de rol, mostramos un mensaje de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Componentes protegidos por roles
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!usuario) return <Navigate to="/" />;
    if (!allowedRoles.includes(rol)) return <Navigate to="/" />;
    return children;
  };

  return (
    <div>
      <Router>
        {usuario ? (
          <>
            <NavBar usuario={usuario} rol={rol} cerrarSesion={cerrarSesion} />
            <Routes>
              <Route path="/" element={<Home />} />

              {/* Rutas para administrador */}
              <Route 
                path="/profesores" 
                element={
                  <ProtectedRoute allowedRoles={['administrador']}>
                    <ProfesorCrud />
                  </ProtectedRoute>
                } 
              />

              {/* Rutas para profesor */}
              <Route 
                path="/calificar" 
                element={
                  <ProtectedRoute allowedRoles={['profesor']}>
                    <EstudianteCalificaciones />
                  </ProtectedRoute>
                } 
              />

              {/* Rutas para estudiante */}
              <Route 
                path="/calificaciones" 
                element={
                  <ProtectedRoute allowedRoles={['estudiante']}>
                    <EstudianteCalificaciones />
                  </ProtectedRoute>
                } 
              />

              {/* Rutas accesibles para todos */}
              <Route path="/conocenos" element={<Conocenos />} />
            </Routes>
            <Footer />
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
