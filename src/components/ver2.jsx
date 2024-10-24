import React, { useState, useEffect } from "react";
import { db } from '../conexion/firebase';
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import '../styles/EstudianteCalificaciones.css';

const EstudianteCalificaciones = () => {
  const [profesores, setProfesores] = useState([]);
  const [filteredProfesores, setFilteredProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [departamentoFiltro, setDepartamentoFiltro] = useState("Todos");

  const preguntas = [
    "Conocimiento del tema",
    "Claridad al explicar",
    "Fomenta participación",
    "Responde preguntas",
    "Usa ejemplos prácticos",
    "Disponibilidad fuera de clase",
    "Retroalimentación útil",
    "Ambiente de respeto"
  ];

  const getProfesores = async () => {
    setCargando(true);
    try {
      const querySnapshot = await getDocs(collection(db, "profesores"));
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setProfesores(data);
      setFilteredProfesores(data);
    } catch (error) {
      console.error("Error al obtener profesores:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    getProfesores();
  }, []);

  useEffect(() => {
    const filtered = profesores.filter((profesor) => 
      profesor.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
      (departamentoFiltro === "Todos" || profesor.departamento === departamentoFiltro)
    );
    setFilteredProfesores(filtered);
  }, [busqueda, departamentoFiltro, profesores]);

  const eliminarTodasCalificaciones = async (profesorId) => {
    try {
      const docRef = doc(db, "profesores", profesorId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Actualizar el documento en Firestore para eliminar todas las calificaciones
        await updateDoc(docRef, {
          calificaciones: []
        });

        // Actualizar el estado local
        setProfesores((prevProfesores) =>
          prevProfesores.map((profesor) =>
            profesor.id === profesorId
              ? { ...profesor, calificaciones: [] }
              : profesor
          )
        );
        setFilteredProfesores((prevProfesores) =>
          prevProfesores.map((profesor) =>
            profesor.id === profesorId
              ? { ...profesor, calificaciones: [] }
              : profesor
          )
        );
      } else {
        console.error("El profesor no existe en la base de datos.");
      }
    } catch (error) {
      console.error("Error al eliminar todas las calificaciones:", error);
    }
  };

  if (cargando) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="calificaciones-container">
      <div className="header">
        <h1>Calificaciones de los profesores</h1>
        <p>Consulta las calificaciones y evaluaciones de todos los docentes.</p>
      </div>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Buscar profesor..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="input-text"
        />
        <select
          value={departamentoFiltro}
          onChange={(e) => setDepartamentoFiltro(e.target.value)}
          className="input-select"
        >
          {["Todos", ...new Set(profesores.map(p => p.departamento))].map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
      </div>

      <div className="profesores-grid">
        {filteredProfesores.map((profesor) => (
          <div key={profesor.id} className="profesor-card">
            <div className="profesor-info">
              <h2>{profesor.nombre}</h2>
              <p>{profesor.departamento}</p>
            </div>

            <div className="calificaciones-detalles">
              {profesor.calificaciones && profesor.calificaciones.length > 0 ? (
                <>
                  {profesor.calificaciones.map((calificacion, index) => (
                    <div key={index} className="calificacion-item">
                      <p><strong>{calificacion.pregunta}:</strong> {calificacion.respuesta}</p>
                    </div>
                  ))}

{profesor.comentarios && (
                <div className="comentarios">
                  <h4>Comentarios:</h4>
                  <p>{profesor.comentarios}</p>
                </div>
              )}
                  <button
                    className="eliminar-todas-button"
                    onClick={() => eliminarTodasCalificaciones(profesor.id)}
                  >
                    Eliminar todas las calificaciones
                  </button>
                </>
              ) : (
                <p>No hay calificaciones disponibles para este profesor.</p>
              )}

              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstudianteCalificaciones;
