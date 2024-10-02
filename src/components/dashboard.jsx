import React from 'react';
import './NavBar.css'; // Estilos para la barra de navegación

const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>UTS Califica</h1>
      <ul>
        <li>Inicio</li>
        <li>Profesores</li>
        <li>Calificaciones</li>
        <li>Estadísticas</li>
        <li>Salir</li>
      </ul>
    </nav>
  );
};

export default NavBar;
