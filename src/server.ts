import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors"

//Conectar a base de datos 
async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold("CONEXIÓN EXITOSA"))
    } catch (error) {
        console.log("")
        //console.log(error)
        console.log(colors.red.bold("HUBO UN ERROR AL CONECTAR A LA DB"))
    }
}

connectDB()

// Servidor
const server = express();

//Leer datos de forms
server.use(express.json())

server.use("/api/products", router)

export default server