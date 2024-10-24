import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../conexion/credenciales';
import logo from '../images/uts_califica.png';
import cerrarSesiones from '../icons/cerrarSesion.ico';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ usuario, rol }) => {
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

  const renderMenuByRole = () => {
    if (!rol) return null;
    switch (rol) {
      case "administrador":
        return (
          <>
            <li className="nav-item">
              <NavLink to="/calificaciones" className="nav-link text-white" onClick={toggleMenu}>calificaciones</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/profesores" className="nav-link text-light" onClick={toggleMenu}>Calificar Profesores</NavLink>
            </li>
            <li className="nav-item">
            <NavLink to="/ver2" className="nav-link text-light" onClick={toggleMenu}>Ver calificacion</NavLink>
            </li>
          </>
        );
      case "profesor":
        return (
          <>
            <li className="nav-item">
              <NavLink to="/ver" className="nav-link text-white" onClick={toggleMenu}>ver</NavLink>
            </li>
         
          </>
        );
      case "usuario":
        return (
          <>
            <li className="nav-item">
              <NavLink to="/ver" className="nav-link text-white" onClick={toggleMenu}>Ver Notas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/calificaciones" className="nav-link text-white" onClick={toggleMenu}>Calificar</NavLink>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#2c3e50', color: '#ecf0f1' }}>
  <div className="container-fluid">
    <NavLink to="/" className="navbar-brand d-flex align-items-center">
      <img src={logo} alt="UTS Califica Logo" className="logo" style={{ width: '120px', height: 'auto', marginRight: '10px' }} />
      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ecf0f1' }}>UTS Califica</span>
    </NavLink>
    <button className="navbar-toggler" type="button" onClick={toggleMenu} style={{ color: '#ecf0f1', borderColor: '#ecf0f1' }}>
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {renderMenuByRole()}
        <li className="nav-item">
          <NavLink to="/conocenos" className="nav-link text-light" onClick={toggleMenu}>Sobre Nosotros</NavLink>
          
        </li>
      </ul>
      <div className="d-flex align-items-center">
        {usuario && (
          <>
            <span className="navbar-text me-3 text-light" style={{ fontSize: '16px', fontWeight: '500' }}>
              {rol ? rol.charAt(0).toUpperCase() + rol.slice(1) : 'Sin rol'}
            </span>
            <button className="btn btn-link nav-link text-light d-flex align-items-center" onClick={cerrarSesion} style={{ textDecoration: 'none' }}>
              <img src={cerrarSesiones} alt="Cerrar Sesión" className="icon-cerrar-sesion" style={{ width: '20px', marginRight: '8px' }} />
              <span style={{ fontSize: '16px', fontWeight: '500' }}>Cerrar Sesión</span>
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
