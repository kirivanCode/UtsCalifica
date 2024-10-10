import React from 'react';
import '../styles/Conocenos.css'; // Cambia esta línea
import ivanImg from '../images/ivan.jpg';
import oscarImg from '../images/oscar.jpg';
import carlosImg from '../images/carlos.jpg';

const Conocenos = () => {
  const integrantes = [
    { nombre: 'Iván Darío Sierra', imagen: ivanImg, rol: 'Desarrollador Frontend' },
    { nombre: 'Óscar Martínez', imagen: oscarImg, rol: 'Desarrollador Backend' },
    { nombre: 'Carlos Pérez', imagen: carlosImg, rol: 'Diseñador UX/UI' },
  ];

  return (
    <div className="conocenos"> {/* Cambia el uso de styles por la clase CSS directamente */}
      <h1>Conócenos</h1>
      
      <section className="vision"> {/* Cambia el uso de styles por la clase CSS directamente */}
        <h2>Nuestra Visión</h2>
        <p>
          Aspiramos a ser la plataforma líder en calificación de profesores en el ámbito académico, 
          facilitando una experiencia de aprendizaje efectiva y transparente para estudiantes y docentes. 
          Creemos en la mejora continua y en la retroalimentación constructiva como pilares de una educación de calidad.
        </p>
      </section>
      
      <section className="mision"> {/* Cambia el uso de styles por la clase CSS directamente */}
        <h2>Nuestra Misión</h2>
        <p>
          Nuestra misión es proporcionar un espacio seguro y accesible donde los estudiantes puedan evaluar 
          a sus profesores, promoviendo la transparencia y la comunicación. 
          Nos comprometemos a utilizar la tecnología para optimizar la educación y brindar herramientas útiles 
          tanto para estudiantes como para docentes.
        </p>
      </section>
      
      <section className="equipo"> {/* Cambia el uso de styles por la clase CSS directamente */}
        <h2>Nuestro Equipo</h2>
        <div className="integrantes"> {/* Cambia el uso de styles por la clase CSS directamente */}
          {integrantes.map((integrante, index) => (
            <div key={index} className="integrante"> {/* Cambia el uso de styles por la clase CSS directamente */}
              <img src={integrante.imagen} alt={integrante.nombre} />
              <p>{integrante.nombre}</p>
              <p>{integrante.rol}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Conocenos;
