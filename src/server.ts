import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors"
import cors, { CorsOptions } from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { swaggerUIOptions } from "./config/swagger";
import morgan from "morgan";

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

// Habilitando CORS
const WHITELIST = [
    process.env.FRONTEND_URL,
    process.env.THIS_URL
]
const corsOptions: CorsOptions = {
    origin: function(origin, callback){
        console.log(origin)
        if(WHITELIST.includes(origin) || !origin){
            console.log('permitir')
            callback(null, true)
        }else{
            console.log(`origin: ${origin} NOT ALLOWED`)
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

server.use('/static', STATIC)

//Leer datos de forms
server.use(express.json())

server.use(morgan('dev'))
server.use("/api/products", router)

//Docs 
server.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server