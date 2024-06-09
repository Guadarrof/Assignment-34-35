import express from "express";
import notesRoutes from "./src/routes/notes.routes.js"
import { dbConnection } from "./src/database/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";

const PORT = 3001;

const notesApi= async () => {

  dotenv.config();
  
  await dbConnection();

  const server = express();

  server.use(cors())

  server.use(express.json());

  server.use("/api/notes", notesRoutes);

  server.listen(PORT, () =>
    console.log("el servidor esta corriendo correctamente en el puerto", PORT)
  );
};

notesApi()
