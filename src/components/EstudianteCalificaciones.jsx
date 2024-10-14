import React, { useState, useEffect } from "react";
import { db } from '../conexion/firebase';
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

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

  const calificarProfesor = async (id, calificaciones, comentarios) => {
    setActualizando(id);
    try {
      const docRef = doc(db, "profesores", id);
      await updateDoc(docRef, { 
        calificaciones,
        comentarios 
      });

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
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Califica a tus profesores
          </h1>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Buscar profesor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={departamentoFiltro}
              onChange={(e) => setDepartamentoFiltro(e.target.value)}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departamentos.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProfesores.map((profesor) => (
              <div key={profesor.id} className="bg-white shadow rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b">
                  <h2 className="text-lg font-semibold text-gray-800">{profesor.nombre}</h2>
                  <p className="text-sm text-gray-600">{profesor.departamento}</p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const calificaciones = preguntas.map((_, index) => parseInt(form[`pregunta${index}`].value));
                    const comentarios = form.comentarios.value;
                    calificarProfesor(profesor.id, calificaciones, comentarios);
                  }}
                  className="p-4 space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {preguntas.map((pregunta, index) => (
                      <div key={index} className="space-y-1">
                        <label htmlFor={`pregunta${index}`} className="block text-xs font-medium text-gray-700">
                          {pregunta}
                        </label>
                        <select 
                          id={`pregunta${index}`}
                          name={`pregunta${index}`} 
                          required
                          className="block w-full text-sm rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        >
                          {escala.map((opcion, optionIndex) => (
                            <option key={optionIndex} value={optionIndex + 1}>
                              {opcion}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor={`comentarios-${profesor.id}`} className="block text-xs font-medium text-gray-700 mb-1">
                      Comentarios adicionales:
                    </label>
                    <textarea 
                      id={`comentarios-${profesor.id}`}
                      name="comentarios" 
                      rows="3"
                      className="block w-full text-sm rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      placeholder="Escribe tus comentarios..." 
                      required
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out ${
                      actualizando === profesor.id ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={actualizando === profesor.id}
                  >
                    {actualizando === profesor.id ? 'Actualizando...' : 'Enviar Calificación'}
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstudianteCalificaciones;