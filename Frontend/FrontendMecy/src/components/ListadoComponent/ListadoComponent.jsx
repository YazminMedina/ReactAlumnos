import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./ListadoComponent.css";

function ListadoComponent(props) {
  const [calificaciones, setCalificaciones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCalificaciones();
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

  const handleCerrarClick = () =>{
    navigate ("/");
  };

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <div>
      <button type="button" onClick={handleCerrarClick} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-slate-600 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-slate-500 ">Cerrar Sesion</button>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-slate-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-600 dark:text-slate-300">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre del Alumno
            </th>
            <th scope="col" className="px-6 py-3">
              Calificación
            </th>
            <th scope="col" className="px-6 py-3">
              Materia
            </th>
          </tr>
        </thead>
        <tbody>
          {calificaciones.map((calificacion, index) => (
            <tr key={index} className={`bg-white border-b dark:bg-slate-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-300 ${calificacion.calificacion < 50 ? 'text-red-600' : 'text-gray-900'}`}>
              <td className="px-6 py-4 font-medium whitespace-nowrap dark:text-slate-600">
                {calificacion.alumnInfo.name}
              </td>
              <td className={`px-6 py-4 ${calificacion.calificacion < 50 ? 'text-red-600' : 'text-gray-900'}`}>
                {calificacion.calificacion}
              </td>
              <td className="px-6 py-4">
                {calificacion.materiaInfo.nombre}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoComponent;
