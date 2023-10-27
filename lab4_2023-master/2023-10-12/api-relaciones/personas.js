import express from "express";
import { db } from "./db.js";

/* 
CREATE TABLE `personas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)
*/

export const personasRouter = express.Router();

personasRouter.get("/", async (req, res) => {
  const [rows, fields] = await db.execute("SELECT * FROM personas");
  res.send(rows);
});

personasRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT * FROM personas WHERE id = :id",
    { id }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Persona no encontrada" });
  }
});

personasRouter.get("/:id/cuenta", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    //"SELECT * FROM cuentas WHERE persona_id = :id",
    "SELECT id, usuario, persona_id AS personaId FROM cuentas WHERE persona_id = :id",
    { id }
  );
  if (rows.length > 0) {
    res.send(rows[0]);
  } else {
    res.status(404).send({ mensaje: "Cuenta no encontrada" });
  }
});

personasRouter.get("/:id/tareas", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT * FROM tareas WHERE persona_id = :id",
    //"SELECT id, descripcion, lista, persona_id as personaId FROM tareas WHERE persona_id=:id",
    { id }
  );
  res.send(rows);
});

personasRouter.get("/:id/materias", async (req, res) => {
  const id = req.params.id;
  const [rows, fields] = await db.execute(
    "SELECT m.id, m.nombre, pm.persona_id as personaId \
    FROM materias m \
    JOIN personas_materias pm ON m.id = pm.materia_id \
    WHERE pm.persona_id = :id",
    { id }
  );
  res.send(rows);
});
