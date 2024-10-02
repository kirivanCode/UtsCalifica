import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProfesorCrud from './components/ProfesorCrud';
import Conocenos from './components/Conocenos';
import EstudianteCalificaciones from './components/EstudianteCalificaciones';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const auth = getAuth();

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      setUsuario(usuarioFirebase ? usuarioFirebase : null);
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div>
      <Router>
        {usuario ? (
          <>
            <NavBar usuario={usuario} cerrarSesion={cerrarSesion} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profesores" element={<ProfesorCrud />} />
              <Route path="/calificaciones" element={<EstudianteCalificaciones />} />
              <Route path="/calificar" element={<EstudianteCalificaciones />} />
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
