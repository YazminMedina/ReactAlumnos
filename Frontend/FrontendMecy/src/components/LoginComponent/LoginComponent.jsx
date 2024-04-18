import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginComponent.css';


function LoginComponent(props) {
  const [email, setEmail] = useState("");
  const [passworld, setPassworld] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
      const alumnoData = { email, passworld };
      const settings = { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify(alumnoData),
      };

      fetch("http://localhost:4000/login", settings)
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error("Error en la solicitud");
          })
          .then((data) => {
              console.log("Respuesta del servidor:", data);
              alert("Inicio de sesión exitoso");

              if (email === "MecyKiddo@gmail.com") {
                navigate('/calificaciones');
              } else {
                navigate('/alumnos');
              } 
          })
          .catch((error) => {
              console.error("Error:", error);
              alert("Datos incorrectos"); 
          });
  };

  return (
    <div className="login-page">
      <div className="form">
      
        <form >
          <div>
            <input
              className="input-box"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="input-box"
              type="passworld"
              placeholder="Passworld"
              value={passworld}
              onChange={(e) => setPassworld(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin} >Login</button>
          <br />
          <br />
          {/* <p className="text-black">No tienes cuenta?</p>
          <a href="/registro">registrate aqui</a> */}

          <p className="text-black">¿No tienes cuenta? <a href="/registro">Registrate aqui</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;