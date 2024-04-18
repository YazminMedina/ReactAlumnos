const express = require("express");
const mongoose = require("mongoose");
const cors = require ('cors');

require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 4000;
app.listen(PORT, ()=>{
    console.log('Alumnos en funcionamiento en http://localhost:${PORT}');
});

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console,"Error de conexion de mongodb: "));
db.once("open", ()=> {
    console.log("Conectando a la base de datos mongodb");
});

const AlumnosSchema = new mongoose.Schema({
    name: String,
    email:  String,
    age: Number,
    passworld: String
});

const Alumnos = mongoose.model("Alumnos", AlumnosSchema);

app.get("/GetAlumnos", async (req, res)=>{
    try{
        const alumno = await Alumnos.find();
        res.json(alumno);
    }catch (error){
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});


// ... (metodo post)======================================================================================================

app.post("/Post-Alumnos", async (req, res) => {
    try {
        const { name, email, age, passworld} = req.body;
        const nuevoAlumno = new Alumnos({
            name,
            email,
            age,
            passworld,
        });

        await nuevoAlumno.save();
        res.status(201).json({ mensaje: "alumno creado exitosamente" });
    } catch (error) {
        console.error("Error al crear alumno:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//===========================================================================================================================


// Método DELETE para eliminar un usuario por ID
app.delete("/Delete-Alumno/:id", async (req, res) => {
    try {
        const AlumnoId = req.params.id;

        // Verificar si el usuario existe
        const AlumnoExistente = await Alumnos.findById(AlumnoId);
        if (!AlumnoExistente) {
            return res.status(404).json({ error: "Alumno no encontrado" });
        }

        // Eliminar el usuario
        await Alumnos.findByIdAndDelete(AlumnoId);

        res.json({ mensaje: "Alumno eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//===========================================================================================================================
//Metodo PUT
// ... (código anterior)

// Método PUT para actualizar un usuario por ID
app.put("/Put-Alumnos/:id", async (req, res) => {
    try {
        const AlumnosId = req.params.id;
        const { name, email, age, passworld} = req.body;

        // Verificar si el usuario existe
        const AlumnosExistente = await Alumnos.findById(AlumnosId);
        if (!AlumnosExistente) {
            return res.status(404).json({ error: "Alumnos no encontrado" });
        }

        // Actualizar la información del usuario
        AlumnosExistente.name = name || AlumnosExistente.name;
        AlumnosExistente.email = email || AlumnosExistente.email;
        AlumnosExistente.age = age || AlumnosExistente.age;
        AlumnosExistente.passworld = passworld || AlumnosExistente.passworld;


        // Guardar los cambios
        await AlumnosExistente.save();

        res.json({ mensaje: "Alumnos actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar Alumnos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//======================================================================================================



