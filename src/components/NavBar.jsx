import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../conexion/credenciales';
import logo from '../images/uts_califica.png'; // Asegúrate de que el logo esté correctamente ubicado
import cerrarSesiones from '../icons/cerrarSesion.ico';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ usuario }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = getAuth(appFirebase);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top shadow">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          {/* Ajusta el tamaño del logo */}
          <img 
            src={logo} 
            alt="UTS Califica Logo" 
            className="logo" 
            style={{ width: '120px', height: 'auto' }} // Establece solo el ancho para mantener la proporción
          />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" onClick={toggleMenu}>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/calificar" className="nav-link" onClick={toggleMenu}>Califica</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/profesores" className="nav-link" onClick={toggleMenu}>Profesores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/conocenos" className="nav-link" onClick={toggleMenu}>Sobre Nosotros</NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {usuario && (
              <>
                <span className="navbar-text me-2 text-light">
                  Usuario Admin
                </span>
                <button className="btn btn-link nav-link text-light" onClick={cerrarSesion}>
                  <img src={cerrarSesiones} alt="Cerrar Sesión" className="icon-cerrar-sesion" style={{ width: '20px', marginRight: '5px' }} />
                  Cerrar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
