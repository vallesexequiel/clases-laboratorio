import express from "express";
import cors from "cors";

// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

let tareasMaxId = 3;
let tareas = [
  {
    id: 1,
    descripcion: "Comprar leche",
    lista: false,
  },
  {
    id: 2,
    descripcion: "Comprar pan",
    lista: true,
  },
  {
    id: 3,
    descripcion: "Comprar pan",
    lista: true,
  },
];

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// POST /tareas: Agregar nueva tarea
app.post("/tareas", (req, res) => {
  const nuevaTarea = { ...req.body.nuevaTarea, id: ++tareasMaxId };
  tareas.push(nuevaTarea);
  res.status(201).send(nuevaTarea);
});

// GET /tareas: Leer todas las tareas
app.get("/tareas", (req, res) => {
  res.send(tareas);
});

// GET /tareas/:id: Leer tareas con :id
app.get("/tareas/:id", (req, res) => {
  const id = req.params.id;
  const tareaEncontrada = tareas.find((tarea) => tarea.id == id);
  if (tareaEncontrada) {
    res.send(tareaEncontrada);
  } else {
    res.status(404).send({ mensaje: "Tarea no encontrada" });
  }
});

// PUT /tareas/:id: Modificar tarea con :id
app.put("/tareas/:id", (req, res) => {
  const id = req.params.id;
  const tarea = req.body.tarea;

  /*
  for (const t of tareas) {
    if (t.id == id) {
      t.descripcion = tarea.descripcion;
      t.lista = tarea.lista;
    }
  }*/
  tareas = tareas.map((t) => (t.id == id ? { id, ...tarea } : t));

  res.send("ok");
});

// DELETE /tareas/:id: Quitar tarea con :id
app.delete("/tareas/:id", (req, res) => {
  const id = req.params.id;
  tareas = tareas.filter((tarea) => tarea.id != id);
  res.send("ok");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
