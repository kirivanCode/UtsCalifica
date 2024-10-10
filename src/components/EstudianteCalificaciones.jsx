import React, { useState, useEffect } from "react";
import { db } from '../conexion/firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import '../styles/CalificarProfesor.css'; // Archivo CSS para estilos

const EstudianteCalificaciones = () => {
  const [profesores, setProfesores] = useState([]);
  const [cargando, setCargando] = useState(true); // Estado para controlar la carga inicial
  const [actualizando, setActualizando] = useState(null); // Estado para controlar cuál profesor está siendo actualizado

  // Obtener la lista de profesores al cargar el componente
  const getProfesores = async () => {
    setCargando(true); // Mostrar spinner de carga mientras obtenemos los datos
    try {
      const querySnapshot = await getDocs(collection(db, "profesores"));
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProfesores(data);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
    } finally {
      setCargando(false); // Ocultar spinner de carga
    }
  };

  // Actualizar la calificación de un profesor sin recargar toda la lista
  const calificarProfesor = async (id, calificacion, calificacion2, calificacion3, comentarios) => {
    setActualizando(id); // Mostrar que estamos actualizando este profesor
    try {
      const docRef = doc(db, "profesores", id);
      await updateDoc(docRef, { 
        calificacion, 
        calificacion2, 
        calificacion3, 
        comentarios 
      });

      // Actualizamos solo el profesor modificado en el estado local sin recargar todo
      setProfesores((prevProfesores) =>
        prevProfesores.map((profesor) =>
          profesor.id === id
            ? { ...profesor, calificacion, calificacion2, calificacion3, comentarios }
            : profesor
        )
      );
    } catch (error) {
      console.error("Error al calificar profesor:", error);
    } finally {
      setActualizando(null); // Desbloquear el profesor cuando se complete la actualización
    }
  };

  useEffect(() => {
    getProfesores(); // Cargar profesores una vez al montar el componente
  }, []);

  if (cargando) {
    return <div className="spinner">Cargando profesores...</div>; // Spinner o mensaje de carga
  }

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
                const calificacion = form.calificacion1.value;
                const calificacion2 = form.calificacion2.value;
                const calificacion3 = form.calificacion3.value;
                const comentarios = form.comentarios.value;
                calificarProfesor(profesor.id, calificacion, calificacion2, calificacion3, comentarios);
              }}
              className="form-calificacion"
            >
              <label>Conocimiento del tema:</label>
              <input type="number" name="calificacion1" min="1" max="5" required />

              <label>Claridad al explicar:</label>
              <input type="number" name="calificacion2" min="1" max="5" required />

              <label>Disponibilidad fuera de clases:</label>
              <input type="number" name="calificacion3" min="1" max="5" required />

              <label>Comentarios:</label>
              <textarea name="comentarios" placeholder="Escribe tus comentarios..." required></textarea>

              <button 
                type="submit" 
                className="btn-calificar" 
                disabled={actualizando === profesor.id}
              >
                {actualizando === profesor.id ? 'Actualizando...' : 'Enviar Calificación'}
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstudianteCalificaciones;


