// Importa las dependencias
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Configura la aplicación Express
const app = express();
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/AlumnosMecy");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conectado a la base de datos MongoDB");
});

// Define el esquema del modelo

let califSchema = new mongoose.Schema({
  alumnoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alumno",
    required: [true, "Property is required"],
  },
  materiaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materia",
    required: [true, "Property is required"],
  },
  _Id: {
    type: mongoose.Schema.Types.ObjectId,
    required: [false, "Property is required"],
  },
  calificacion: {
    type: Number,
    required: [true, "Property is required"],
  },
});

const alumSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Property is required"],
        },
    email:{
        type:String,
        required: [true, "Property is required"],
        },    
    age:{
        type:Number,
        required: [true, "Property is required"],
        },
    passworld:{
        type:String,
        required: [true, "Property is required"],
        }
});

const matSchema = new mongoose.Schema({
  nombre:{
      type:String,
      required: [true, "Property is required"],
      }
});

// Define el modelo
const Calificacion = mongoose.model("Calificaciones", califSchema);
// const Usuario = mongoose.model("Usuarios", userSchema);
const Materia = mongoose.model("Materias", matSchema);
const Alumno = mongoose.model("Alumno", alumSchema);

// Ruta GET para obtener todos los usuarios
app.get("/calificaciones", async (req, res) => {
  try {
    const calificaciones = await Calificacion.find();

    let nuevasCalif = await Promise.all(
      calificaciones.map(async (element) => {
        const alumnInfo = await Alumno.findById(element.alumnoId);
        const materiaInfo = await Materia.findById(element.materiaId);
        return {
          alumnInfo,
          materiaInfo,
          _id: element._id,
          calificacion: element.calificacion
        };
      })
    );

    res.json(nuevasCalif);
  } catch (error) {
    console.error("Error al obtener calificaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta PUT para actualizar una calificación existente
app.put("/Actualizarcalificaciones/:id", async (req, res) => {
  try {
    const { calificacion } = req.body;
    const calificacionId = req.params.id;

    const updatedCalificacion = await Calificacion.findByIdAndUpdate(
      calificacionId,
      { calificacion },
      { new: true }
    );

    if (!updatedCalificacion) {
      return res.status(404).json({ error: "Calificación no encontrada" });
    }

    res.json({ message: "Calificación actualizada", updatedCalificacion });
  } catch (error) {
    console.error("Error al actualizar calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.post("/Post-calificaciones", async (req, res) => {
  try {
    const { alumnoId, materiaId, calificacion } = req.body;
    // Crea una nueva instancia de Calificacion
    const nuevaCalificacion = new Calificacion({
      alumnoId,
      materiaId,
      calificacion
    });
    await nuevaCalificacion.save();

    res.status(201).json({ message: "Calificación creada exitosamente" });
  } catch (error) {
    console.error("Error al crear calificación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


//////////////////////////////////////////////////////////

app.get("/Getalumnos", async (req, res) => {
  try {
    const alumnos = await Alumno.find();
    res.json(alumnos);
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.get("/materias", async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (error) {
    console.error("Error al obtener materias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
/////////////////////////////////////////////////////////
app.delete("/Eliminarcalificacion/:id", async (req, res) => {
  try {
    await Calificacion.findByIdAndDelete(req.params.id);
    res.json({ message: "calificacion eliminada" });
  } catch (error) {
    console.error("Error al eliminar alumno:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.post("/login", async (req, res) => {
  const { email, passworld } = req.body;
  try {
      const alumno = await Alumno.findOne({ email });

      if (alumno && alumno.passworld === passworld) {
          res.status(200).json({ message: "Inicio de sesión exitoso", alumno });
      } else {
          res.status(401).json({ error: "Credenciales inválidas" });
      }
  } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
});


app.post("/register", async (req, res) => {
  try {
      const { name, email, age, passworld } = req.body;
      const newAlumno = new Alumno({ name, email, age, passworld });
      await newAlumno.save();
      res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
      console.error("Error al registrar usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
});
// Inicia el servidor
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});