import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors"
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";

//Conectar a base de datos 
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        //console.log(colors.blue.bold("CONEXIÓN EXITOSA"))
    } catch (error) {
        console.log(colors.red.bold("HUBO UN ERROR AL CONECTAR A LA DB"))
    }
}

connectDB()

// Servidor
const server = express();
const STATIC = express.static('public')

server.use('/static', STATIC)

//Leer datos de forms
server.use(express.json())

server.use("/api/products", router)

//Docs 
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server