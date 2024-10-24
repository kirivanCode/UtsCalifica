import React, { useState, useEffect } from "react";
import { db } from '../conexion/firebase';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from "firebase/firestore";
import '../styles/ProfesoresCrud.css';

const ProfesorCrud = () => {
  const [profesores, setProfesores] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEdicion, setIdEdicion] = useState(null);

  const getProfesores = async () => {
    const querySnapshot = await getDocs(collection(db, "profesores"));
    const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setProfesores(data);
  };

  const crearProfesor = async () => {
    if (nuevoNombre.trim()) {
      await addDoc(collection(db, "profesores"), { nombre: nuevoNombre });
      setNuevoNombre("");
      getProfesores();
    }
  };

  const editarProfesor = (id, nombre) => {
    setEditando(true);
    setIdEdicion(id);
    setNuevoNombre(nombre);
  };

  const actualizarProfesor = async () => {
    if (nuevoNombre.trim()) {
      const docRef = doc(db, "profesores", idEdicion);
      await updateDoc(docRef, { nombre: nuevoNombre });
      setEditando(false);
      setNuevoNombre("");
      getProfesores();
    }
  };

  const eliminarProfesor = async (id) => {
    const docRef = doc(db, "profesores", id);
    await deleteDoc(docRef);
    getProfesores();
  };

  useEffect(() => {
    getProfesores();
  }, []);

  return (
    <div className="profesor-crud-container">
      <div className="form-profesor">
        <h2 className="form-header">{editando ? "Editar Profesor" : "Agregar Profesor"}</h2>
        <input
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
          placeholder="Nombre del profesor"
          className="form-input"
        />
        <button onClick={editando ? actualizarProfesor : crearProfesor} className="form-button">
          {editando ? "Actualizar" : "Agregar"}
        </button>
      </div>

      <ul className="profesores-list">
        {profesores.map((profesor) => (
          <li key={profesor.id} className="profesor-item">
            <span>{profesor.nombre}</span>
            <div className="actions">
              <button onClick={() => editarProfesor(profesor.id, profesor.nombre)} className="action-button edit-button">
                Editar
              </button>
              <button onClick={() => eliminarProfesor(profesor.id)} className="action-button delete-button">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfesorCrud;
