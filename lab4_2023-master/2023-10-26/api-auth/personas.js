import express from "express";
import { db } from "./db.js";
import { body, param, query, validationResult } from "express-validator";

/* 
CREATE TABLE `personas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `apellido` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)
*/

export const personasRouter = express
  .Router()

  .get("/", async (req, res) => {
    const [rows, fields] = await db.execute("SELECT * FROM personas");
    res.send(rows);
  })

  .get("/:id", param("id").isInt({ min: 1 }), async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
      res.status(400).send({ errors: validacion.array() });
      return;
    }
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT * FROM personas WHERE id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Persona no encontrada" });
    }
  })

  .get("/:id/cuenta", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT id, usuario FROM cuentas WHERE persona_id = :id",
      { id }
    );
    if (rows.length > 0) {
      res.send(rows[0]);
    } else {
      res.status(404).send({ mensaje: "Cuenta no encontrada" });
    }
  })

  .get(
    "/:id/tareas",
    param("id").isInt({ min: 1 }),
    query("lista").isInt({ min: 0, max: 1 }).optional(),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }

      const { id } = req.params;
      const { lista } = req.query;

      const generarWhere = () => {
        let where = "WHERE persona_id = :id";
        if (lista != undefined) {
          where += " AND lista = :lista";
        }
        return where;
      };

      const [rows, fields] = await db.execute(
        `SELECT id, descripcion, lista FROM tareas ${generarWhere()}`,
        { id, lista }
      );
      res.send(rows);
    }
  )

  .get("/:id/materias", async (req, res) => {
    const { id } = req.params;
    const [rows, fields] = await db.execute(
      "SELECT m.id, m.nombre, pm.persona_id as personaId \
    FROM materias m \
    JOIN personas_materias pm ON m.id = pm.materia_id \
    WHERE pm.persona_id = :id",
      { id }
    );
    res.send(rows);
  })

  .post(
    "/",
    body("nombre").isAlpha().isLength({ min: 1, max: 50 }),
    body("apellido").isAlpha().isLength({ min: 1, max: 50 }),
    async (req, res) => {
      const validacion = validationResult(req);
      if (!validacion.isEmpty()) {
        res.status(400).send({ errors: validacion.array() });
        return;
      }

      const { nombre, apellido } = req.body;
      const [rows] = await db.execute(
        "INSERT INTO personas (nombre, apellido) VALUES (:nombre, :apellido)",
        { nombre, apellido }
      );
      res.status(201).send({ nombre, apellido, id: rows.insertId });
    }
  );
