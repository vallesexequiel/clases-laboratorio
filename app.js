const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hola mundo! desde GET");
});

app.post("/", (req, res) => {
  res.send("Hola mundo! desde POST");
});

app.get("/chau", (req, res) => {
  res.send("Chau mundo!");
});

app.listen(port, () => {
  console.log("Aplicacion funcionando en puerto: " + port);
});
