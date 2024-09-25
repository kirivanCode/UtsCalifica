import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../conexion/credenciales';
import logo from '../images/Califica.png';
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
    <nav className={`navbar navbar-expand-lg bg-success navbar-light shadow`}>
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo" style={{ width: '150px' }} />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link active">Inicio</NavLink>
            </li>
            {usuario && (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={cerrarSesion}>
                  <img src={cerrarSesiones} alt="Cerrar Sesión" className="icon-cerrar-sesion" style={{ width: '25px' }} />
                  Cerrar Sesión
                </button>
              </li>
            )}
          </ul>
          {usuario && (
            <span className="navbar-text me-2">
              Usuario Admin
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
