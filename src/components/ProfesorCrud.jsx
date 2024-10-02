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
    await addDoc(collection(db, "profesores"), { nombre: nuevoNombre });
    getProfesores();
  };

  const editarProfesor = async (id) => {
    setEditando(true);
    setIdEdicion(id);
  };

  const actualizarProfesor = async () => {
    const docRef = doc(db, "profesores", idEdicion);
    await updateDoc(docRef, { nombre: nuevoNombre });
    setEditando(false);
    getProfesores();
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
    <div>
      <h2>Gestión de Profesores</h2>
      <input
        value={nuevoNombre}
        onChange={(e) => setNuevoNombre(e.target.value)}
        placeholder="Nombre del profesor"
      />
      {editando ? (
        <button onClick={actualizarProfesor}>Actualizar</button>
      ) : (
        <button onClick={crearProfesor}>Agregar</button>
      )}

      <ul>
        {profesores.map((profesor) => (
          <li key={profesor.id}>
            {profesor.nombre}
            <button onClick={() => editarProfesor(profesor.id)}>Editar</button>
            <button onClick={() => eliminarProfesor(profesor.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfesorCrud;
