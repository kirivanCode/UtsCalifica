
















import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import appFirebase from '../conexion/credenciales';
import logo from '../images/uts_califica.png';
import cerrarSesiones from '../icons/cerrarSesion.ico';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = ({ usuario, rol }) => { // Recibe el rol del usuario
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
    if (!rol) return null; // Verifica que el rol esté definido
    switch (rol) {
      case "administrador":
        return (
          <>
            <li className="nav-item">
              <NavLink to="/admin-dashboard" className="nav-link" onClick={toggleMenu}>Admin Dashboard</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/manage-users" className="nav-link" onClick={toggleMenu}>Gestionar Usuarios</NavLink>
            </li>
          </>
        );
      case "profesor":
        return (
          <>
            <li className="nav-item">
              <NavLink to="/calificar" className="nav-link" onClick={toggleMenu}>Calificar</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mis-clases" className="nav-link" onClick={toggleMenu}>Mis Clases</NavLink>
            </li>
          </>
        );
      case "estudiante":
        return (
          <>
            <li className="nav-item">
              <NavLink to="/ver-notas" className="nav-link" onClick={toggleMenu}>Ver Notas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mis-profesores" className="nav-link" onClick={toggleMenu}>Mis Profesores</NavLink>
            </li>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark fixed-top shadow">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img src={logo} alt="UTS Califica Logo" className="logo" style={{ width: '120px', height: 'auto' }} />
        </NavLink>
        <button className="navbar-toggler" type="button" onClick={toggleMenu}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {renderMenuByRole()}
            <li className="nav-item">
              <NavLink to="/conocenos" className="nav-link" onClick={toggleMenu}>Sobre Nosotros</NavLink>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {usuario && (
              <>
                <span className="navbar-text me-2 text-light">
                  {rol ? rol.charAt(0).toUpperCase() + rol.slice(1) : 'Sin rol'}
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

