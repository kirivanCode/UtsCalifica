import React, { useState, useEffect } from "react";
import { db } from '../conexion/firebase'; // Asegúrate de que la conexión esté configurada correctamente
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore"; // Importa getDoc
import '../styles/EstudianteCalificaciones.css'; // Archivo CSS personalizado

const EstudianteCalificaciones = () => {
  const [profesores, setProfesores] = useState([]);
  const [filteredProfesores, setFilteredProfesores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(null);
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

  const escala = ["Nunca", "Raramente", "A veces", "Frecuentemente", "Siempre"];

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

  const calificarProfesor = async (id, comentarios, form) => {
    setActualizando(id);
    try {
      const docRef = doc(db, "profesores", id);
      const docSnap = await getDoc(docRef); // Obtener el documento actual

      let calificaciones = docSnap.exists() ? docSnap.data().calificaciones || [] : []; // Obtener calificaciones existentes

      // Crear nuevo arreglo de calificaciones
      const nuevasCalificaciones = preguntas.map((pregunta, index) => ({
        pregunta: pregunta,
        respuesta: escala[parseInt(form[`pregunta${index}`].value) - 1] // Obtener la respuesta como texto
      }));

      // Combinar calificaciones existentes y nuevas
      calificaciones = [...calificaciones, ...nuevasCalificaciones]; // Agregar nuevas calificaciones al arreglo existente

      // Actualizar el documento en Firebase
      await updateDoc(docRef, { 
        calificaciones,
        comentarios 
      });

      // Actualizar el estado local
      setProfesores((prevProfesores) =>
        prevProfesores.map((profesor) =>
          profesor.id === id
            ? { ...profesor, calificaciones, comentarios }
            : profesor
        )
      );
      setFilteredProfesores((prevProfesores) =>
        prevProfesores.map((profesor) =>
          profesor.id === id
            ? { ...profesor, calificaciones, comentarios }
            : profesor
        )
      );
    } catch (error) {
      console.error("Error al calificar profesor:", error);
    } finally {
      setActualizando(null);
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

  const departamentos = ["Todos", ...new Set(profesores.map(p => p.departamento))];

  if (cargando) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="calificaciones-container">
      <div className="header">
        <h1>Califica a tus profesores</h1>
        <p>Ayuda a mejorar la calidad educativa evaluando a tus docentes.</p>
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
          {departamentos.map((dep) => (
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target; // Guardamos el formulario
                const comentarios = form.comentarios.value; // Obtenemos solo los comentarios
                calificarProfesor(profesor.id, comentarios, form); // Llamamos a la función con el id y el formulario
              }}
              className="calificaciones-form"
            >
              {preguntas.map((pregunta, index) => (
                <div key={index} className="pregunta">
                  <label htmlFor={`pregunta${index}`}>{pregunta}</label>
                  <select id={`pregunta${index}`} name={`pregunta${index}`} required>
                    {escala.map((opcion, optionIndex) => (
                      <option key={optionIndex} value={optionIndex + 1}>
                        {opcion}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
              <div className="comentarios">
                <label htmlFor={`comentarios-${profesor.id}`}>Comentarios adicionales:</label>
                <textarea
                  id={`comentarios-${profesor.id}`}
                  name="comentarios"
                  rows="4"
                  placeholder="Escribe tus comentarios..." 
                  required
                ></textarea>
              </div>
              <button type="submit" className={`submit-button ${actualizando === profesor.id ? 'disabled' : ''}`} disabled={actualizando === profesor.id}>
                {actualizando === profesor.id ? 'Actualizando...' : 'Enviar Calificación'}
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstudianteCalificaciones;
