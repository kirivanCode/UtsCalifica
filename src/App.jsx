import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; // Asegúrate de importar Firebase
// Importa tu configuración de credenciales Firebase

import Home from './components/Home';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/App.css';
const auth = getAuth();

function App() {
 

  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        setUsuario(usuarioFirebase);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      setUsuario(null);
      setCartItems([]);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };


  return (
    <div>
      <Router>
        {usuario ? (
          <>
            <NavBar usuario={usuario} cerrarSesion={cerrarSesion}/>
            <Routes>
              <Route path="/" element={<Home />} />
              
              
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
