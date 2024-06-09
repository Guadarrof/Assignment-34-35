import express from "express";
import endpointRoute from "./src/routes/firstEndpointRoute.routes.js";
import authRoutes from "./src/routes/auth.routes.js"
import { dbConnection } from "./src/database/dbConnection.js";
import cors from "cors";
import dotenv from "dotenv";

const PORT = 4000;

const appServer = async () => {
  dotenv.config();
  
  await dbConnection(); // coneccion a nuestra base de datos mongo

  const server = express();

  server.use(cors())

  server.use(express.json()); //le estoy pidiendo que use formato json en vez de xml

  server.use("/api/endpoint", endpointRoute);

  server.use("/api/auth", authRoutes);

  server.listen(PORT, () =>
    console.log("el servidor esta corriendo correctamente en el puerto", PORT)
  ); // le digo que servidor va ha usar
};

appServer()

//INSTALLAR:
// mongoose para DB
//express para trabajar con postman
//nodemon para update el server
//bycrypt para encriptar password
//cors para evitar errores cuando queremos acceder a nuestro backend de forma remota
//dotenv nos permite configurar nuestros archivos .env (environment) en donde declaro las variables de entorno PARA QUE ANDE TIENE QUE ESTAR EN LA RAIZ DEL PROYECTO