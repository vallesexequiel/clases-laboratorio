import "dotenv/config";
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

// Conectar a base de datos
const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  namedPlaceholders: true,
});
console.log("Conectado a base de datos");

// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// POST /tareas: Agregar nueva tarea
app.post("/tareas", async (req, res) => {
  const tarea = req.body.tarea;
  const [rows] = await db.execute(
    "INSERT INTO tareas (descripcion, lista) VALUES (:descripcion, :lista)",
    { descripcion: tarea.descripcion, lista: tarea.lista }
  );
  res.status(201).send({ ...tarea, id: rows.insertId });
});

// GET /tareas: Leer todas las tareas
app.get("/tareas", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM tareas");
  res.send(rows);
});

// GET /tareas/:id: Leer tareas con :id
app.get("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute("SELECT * FROM tareas WHERE id=:id", {
    id,
  });
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Tarea no encontrada" });
  }
});

// PUT /tareas/:id: Modificar tarea con :id
app.put("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  const tarea = req.body.tarea;
  await db.execute(
    "UPDATE tareas SET descripcion=:descripcion, lista=:lista WHERE id=:id",
    { id, descripcion: tarea.descripcion, lista: tarea.lista }
  );
  res.send("ok");
});

// DELETE /tareas/:id: Quitar tarea con :id
app.delete("/tareas/:id", async (req, res) => {
  const id = req.params.id;
  await db.execute("DELETE FROM tareas WHERE id=:id", { id });
  res.send("ok");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
