import express from "express";

// Creo aplicacion express
const app = express();

app.use(express.json());

const datos = ["pera", "manzana", "banana", "uva", "naranja"];

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// CRUD / ABM
// Agregar (Create)
// Leer (Read/Retrive)
// Modificar (Update)
// Eliminar (Delete)

// POST /datos
// Agregar nuevo dato
app.post("/datos", (req, res) => {
  const nuevoDato = req.body.nuevoDato;
  datos.push(nuevoDato);
  res.status(201).send(nuevoDato);
});

// GET /datos
// Leer todos los datos
app.get("/datos", (req, res) => {
  res.send(datos);
});

// GET /datos/primero
app.get("/datos/primero", (req, res) => {
  console.log("en primero");
  res.send(datos[0]);
});

// GET /datos/:id
// Leer datos en indice :id
app.get("/datos/:id", (req, res) => {
  console.log("con id");
  const id = req.params.id;
  res.send(datos[id]);
});

// PUT /datos/:id
// Modificar dato en :id
app.put("/datos/:id", (req, res) => {
  const id = req.params.id;
  const nuevoValor = req.body.nuevoValor;
  datos[id] = nuevoValor;
  res.send("ok");
});

// DELETE /datos/:id
// Quitar elemento en indice :id
app.delete("/datos/:id", (req, res) => {
  const id = req.params.id;
  datos.splice(id, 1);
  res.send("ok");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
