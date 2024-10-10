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
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
        const docRef = doc(db, "usuarios", usuarioFirebase.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setRol(docSnap.data().rol);
        } else {
          setRol(null);
        }
      } else {
        setUsuario(null);
        setRol(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
      setRol(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!usuario) return <Navigate to="/" />;
    if (!allowedRoles.includes(rol)) return <Navigate to="/" />;
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        {usuario ? (
          <>
            <NavBar usuario={usuario} rol={rol} cerrarSesion={cerrarSesion} />
            <div className="content-container">
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/profesores" 
                  element={
                    <ProtectedRoute allowedRoles={['administrador']}>
                      <ProfesorCrud />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/calificar" 
                  element={
                    <ProtectedRoute allowedRoles={['profesor']}>
                      <EstudianteCalificaciones />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/calificaciones" 
                  element={
                    <ProtectedRoute allowedRoles={['estudiante']}>
                      <EstudianteCalificaciones />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/conocenos" element={<Conocenos />} />
              </Routes>
            </div>
            <Footer />
           
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login setUsuario={setUsuario} setRol={setRol} />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

