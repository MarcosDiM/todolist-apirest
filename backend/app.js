import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import sprintRoutes from "./routes/sprintRoutes.js";
import backlogRoutes from "./routes/backlogRoutes.js";
import { specs, swaggerUi } from "./swagger.js";

dotenv.config();

//Inicializa la app con express
const app = express();

app.use(cors());


//Parsea JSON en las peticiones
app.use(express.json())

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB: ", err));


//Rutas
app.use("/tasks", taskRoutes);
app.use("/sprints", sprintRoutes);
app.use("/backlog", backlogRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});
