import React, { useState } from 'react';
import "./RegisterComponent.css";

function RegisterComponent() {

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [email, setEmail] = useState("");
  const [passworld, setPassworld] = useState("");

  const hablarAUsuario = (message) => {
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(message);
    utterThis.lang = "es-ES";
    synth.speak(utterThis);
  };

  const handleRegister = () => {
    let error = false;

    if (nombre.length < 5) {
      error = true;
      hablarAUsuario("No olvides introducir correctamente tu nombre");
    }

    if (passworld.length < 5) {
      error = true;
      hablarAUsuario("La contraseña debe tener al menos 5 caracteres");
    }

    if (!error) {
      const newAlumno = {
        name: nombre,
        email: email,
        age: edad,
        passworld: passworld
      };

      fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newAlumno)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la solicitud");
      })
      .then(data => {
        console.log("Respuesta:", data);
        alert("Registro exitoso");
        // Aquí podrías manejar la respuesta, como mostrar un mensaje de éxito
      })
      .catch(error => {
        console.error("Error:", error);
        // Aquí podrías manejar el error, como mostrar un mensaje de error al usuario
      });
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form>
          <div>
            <input
              type="text"
              name="inputNombre"
              id="inputNombre"
              placeholder="Introduce tu nombre"
              onChange={(event) => setNombre(event.target.value)}
            />
          </div>
          <div>
            <input
              type="number"
              name="inputEdad"
              id="inputEdad"
              placeholder="Introduce tu edad"
              onChange={(event) => setEdad(event.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="inputCorreo"
              id="inputCorreo"
              placeholder="Introduce tu correo"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="inputPassworld"
              id="inputPassworld"
              placeholder="Introduce tu contraseña"
              onChange={(event) => setPassworld(event.target.value)}
            />
          </div>
          <button type="button" onClick={handleRegister}>Crear</button>
          <p className="message">¿Ya estás registrado? <a href="/">Inicia sesión</a></p>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
