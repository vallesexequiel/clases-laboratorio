import express from "express";
import { db } from "./db.js";

/*
CREATE TABLE `tareas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) NOT NULL,
  `lista` tinyint NOT NULL,
  `persona_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_tareas_personas_persona_id_idx` (`persona_id`),
  CONSTRAINT `fk_tareas_personas_persona_id` FOREIGN KEY (`persona_id`) REFERENCES `personas` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
)
*/

export const cuentasRouter = express
  .Router()
  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, persona_id as personaId FROM cuentas"
    );
    res.send(rows);
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT id, usuario, persona_id as personaId FROM cuentas WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Cuenta no encontrada" });
    }
  })
  .get("/:id/persona", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT p.id, p.apellido, p.nombre \
      FROM personas p \
      JOIN cuentas c ON p.id = c.persona_id \
      WHERE c.id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Persona no encontrada" });
    }
  });
