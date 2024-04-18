
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegisterComponent from "./components/RegisterComponent/RegisterComponent";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import ListadoComponent from "./components/ListadoComponent/ListadoComponent";
import ListadoBoss from './components/ListadoBoss/ListadoBoss';
import './App.css';

function App() {
  return(
    
          <Router>
              <Routes>
                <Route exact path="/" element={<LoginComponent/>}/>
                <Route exact path="/registro" element={<RegisterComponent/>}/>
                <Route exact path="/alumnos" element={<ListadoComponent/>}/>
                <Route exact path="/calificaciones" element={<ListadoBoss/>}/>
            </Routes>
          </Router>
  );
  }

  export default App;

