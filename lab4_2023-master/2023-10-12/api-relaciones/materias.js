import express from "express";
import { db } from "./db.js";

/*
CREATE TABLE `materias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)

CREATE TABLE `personas_materias` (
  `persona_id` int NOT NULL,
  `materia_id` int NOT NULL,
  PRIMARY KEY (`persona_id`,`materia_id`),
  KEY `fk_personas_materias_materias_materia_id_idx` (`materia_id`),
  CONSTRAINT `fk_personas_materias_materias_materia_id` FOREIGN KEY (`materia_id`) REFERENCES `materias` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_personas_materias_personas_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
)
*/

export const materiasRouter = express
  .Router()
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM materias");
    res.send(rows);
  })
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT * FROM materias WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Materia no encontrada" });
    }
  })
  .get("/:id/personas", async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await db.execute(
      "SELECT p.id, p.apellido, p.nombre \
      FROM personas p \
      JOIN personas_materias pm ON p.id = pm.persona_id \
      WHERE pm.materia_id = :id",
      { id }
    );
    res.send(rows);
  });
