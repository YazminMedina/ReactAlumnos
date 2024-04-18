import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./ListadoBoss.css";

function ListadoBoss(props) {
  const [calificaciones, setCalificaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false); // Nuevo estado para el modal de actualización
  const [selectedCalificacion, setSelectedCalificacion] = useState(null);
  const [selectedCalificacionToUpdate, setSelectedCalificacionToUpdate] = useState(null); // Nuevo estado para la calificación seleccionada para actualizar
  const [nuevaCalificacion, setNuevaCalificacion] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState("");
  const [selectedMateria, setSelectedMateria] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    fetchCalificaciones();
    fetchAlumnos();
    fetchMaterias();
  }, []);

  const fetchCalificaciones = async () => {
    try {
      const response = await fetch("http://localhost:4000/calificaciones");
      if (response.ok) {
        const data = await response.json();
        setCalificaciones(data);
      } else {
        throw new Error("Error al obtener calificaciones");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAlumnos = async () => {
    try {
      const response = await fetch("http://localhost:4000/Getalumnos");
      if (response.ok) {
        const data = await response.json();
        setAlumnos(data);
      } else {
        throw new Error("Error al obtener alumnos");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMaterias = async () => {
    try {
      const response = await fetch("http://localhost:4000/materias");
      if (response.ok) {
        const data = await response.json();
        setMaterias(data);
      } else {
        throw new Error("Error al obtener materias");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleModal = (calificacion) => {
    setSelectedCalificacion(calificacion);

    if (calificacion) {
      setNuevaCalificacion(calificacion.calificacion); 
    }
    setShowModal(!showModal);
  };

  const toggleUpdateModal = (calificacion) => { // Función para abrir el modal de actualización
    setSelectedCalificacionToUpdate(calificacion);
    setNuevaCalificacion(calificacion.calificacion); // Se establece la calificación actual como valor por defecto en el input
    setShowUpdateModal(!showUpdateModal);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!selectedAlumno || !selectedMateria || !nuevaCalificacion) {
        throw new Error("Por favor complete todos los campos");
      }
      
      const response = await fetch("http://localhost:4000/Post-calificaciones", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          alumnoId: selectedAlumno,
          materiaId: selectedMateria,
          calificacion: nuevaCalificacion
        })
      });

      if (response.ok) {
        fetchCalificaciones();
        toggleModal();
      } else {
        throw new Error("Error al crear calificación");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:4000/Actualizarcalificaciones/${selectedCalificacionToUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          calificacion: nuevaCalificacion
        })
      });
      if (response.ok) {
        fetchCalificaciones();
        toggleUpdateModal();
      } else {
        throw new Error("Error al actualizar calificación");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    console.log("ID de calificación a eliminar:", id);
    try {
      const response = await fetch(`http://localhost:4000/Eliminarcalificacion/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchCalificaciones();
      } else {
        throw new Error("Error al eliminar calificación");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrimeroClick = () =>{
    navigate ("/");
  };
  const handleSegundoClick = () =>{
    navigate ("/alumnos");
  };

  return (

    
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
       <div className='botonesesquina'>
      <button type="button" onClick={handlePrimeroClick} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500 ">Cerrar Sesion</button>
      <button type="button" onClick={handleSegundoClick} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500 ">Tabla de reprobados</button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-slate-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-600 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre del Alumno
            </th>
            <th scope="col" className="px-6 py-3">
              Correo
            </th>
            <th scope="col" className="px-6 py-3">
              Calificaciones
            </th>
            <th scope="col" className="px-6 py-3">
              Materias
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {calificaciones.map((calificacion, index) => (
            <tr key={index} className="bg-white border-b dark:bg-slate-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-300">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-slate-600">
                {calificacion.alumnInfo.name}
              </th>
              <td className="px-6 py-4">
                {calificacion.alumnInfo.email}
              </td>
              <td className="px-6 py-4">
                {calificacion.calificacion}
              </td>
              <td className="px-6 py-4">
                {calificacion.materiaInfo.nombre}
              </td>
              <td>
                <button type="button" onClick={() => toggleUpdateModal(calificacion)} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500">EDITAR</button>
              </td>
              <td>
                <button type="button" onClick={() => handleDelete(calificacion._id)} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500">ELIMINAR</button>
              </td>
            </tr>
          ))}
          
          <tr>
            <td className="center-button" colSpan="6">
              <button type="button" onClick={() => setShowModal(true)} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500 ">CREAR NUEVA CALIFICACION</button>
            </td>
          </tr>
        </tbody>
      </table>

      {showModal && (
        <div className="modal" key="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="alumno">Alumno:</label>
                <select id="alumno" value={selectedAlumno} onChange={(e) => setSelectedAlumno(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {alumnos.map((alumno) => (
                    <option key={alumno._id} value={alumno._id}>{alumno.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="materia">Materia:</label>
                <select id="materia" value={selectedMateria} onChange={(e) => setSelectedMateria(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                  {materias.map((materia) => (
                    <option key={materia._id} value={materia._id}>{materia.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="calificacion">Calificación:</label>
                <input 
                  type="number" 
                  id="calificacion" 
                  value={nuevaCalificacion} 
                  onChange={(e) => setNuevaCalificacion(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                  placeholder="Nueva Calificación" 
                  required 
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500">Aceptar</button>
                <button type="button" onClick={() => setShowModal(false)} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Nuevo modal de actualización */}
      {showUpdateModal && (
        <div className="update-modal" key="update-modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowUpdateModal(false)}>&times;</span>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="updated-calificacion">Nueva Calificación:</label>
                <input 
                  type="number" 
                  id="updated-calificacion" 
                  value={nuevaCalificacion} 
                  onChange={(e) => setNuevaCalificacion(e.target.value)} 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
                  placeholder="Nueva Calificación" 
                  required 
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="update-button py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500">Actualizar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListadoBoss;
