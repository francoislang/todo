const express = require("express");
const mongoose = require("mongoose");
const todoRoutes = require("./router/todo.routes");
const cors = require("cors");

require("./db");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
