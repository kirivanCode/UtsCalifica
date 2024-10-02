import React, { useState, useEffect } from "react";
import { db } from '../conexion/firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import '../styles/calificarProfesor.css'; // Archivo CSS para estilos

const EstudianteCalificaciones = () => {
  const [profesores, setProfesores] = useState([]);

  const getProfesores = async () => {
    const querySnapshot = await getDocs(collection(db, "profesores"));
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProfesores(data);
  };

  const calificarProfesor = async (id, calificacion, comentarios) => {
    const docRef = doc(db, "profesores", id);
    await updateDoc(docRef, { calificacion, comentarios });
    getProfesores();
  };

  useEffect(() => {
    getProfesores();
  }, []);

  return (
    <div className="calificacion-container">
      <h2>Califica a tus profesores</h2>
      <ul className="profesor-lista">
        {profesores.map((profesor) => (
          <li key={profesor.id} className="profesor-item">
            <h3>{profesor.nombre}</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const calificacion = form.calificacion.value;
                const comentarios = form.comentarios.value;
                calificarProfesor(profesor.id, calificacion, comentarios);
              }}
              className="form-calificacion"
            >
              <label>Conocimiento del tema:</label>
              <input type="number" name="calificacion" min="1" max="5" required />

              <label>Claridad al explicar:</label>
              <input type="number" name="calificacion2" min="1" max="5" required />

              <label>Disponibilidad fuera de clases:</label>
              <input type="number" name="calificacion3" min="1" max="5" required />

              <label>Comentarios:</label>
              <textarea name="comentarios" placeholder="Escribe tus comentarios..." required></textarea>

              <button type="submit" className="btn-calificar">Enviar Calificación</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstudianteCalificaciones;
