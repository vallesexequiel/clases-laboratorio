import "dotenv/config";
import express from "express";
import cors from "cors";
import { personasRouter } from "./personas.js";
import { cuentasRouter } from "./cuentas.js";
import { tareasRouter } from "./tareas.js";
import { materiasRouter } from "./materias.js";
import { authConfig, authRouter } from "./auth.js";

// Creo aplicacion express
const app = express();

app.use(express.json());
app.use(cors());

authConfig();

app.use("/auth", authRouter);
app.use("/personas", personasRouter);
app.use("/cuentas", cuentasRouter);
app.use("/tareas", tareasRouter);
app.use("/materias", materiasRouter);

// Registrar metodo GET en ruta raiz ('/')
app.get("/", (req, res) => {
  res.send("Hola mundo");
});

// Pongo en funcionamiento la API en puerto 3000
app.listen(3000, () => {
  console.log("API en funcionamiento");
});
