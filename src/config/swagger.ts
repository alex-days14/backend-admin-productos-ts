import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products',
                description: 'API service for products'
            }
        ],
        info: {
            title: 'REST API / Express.js / Node.js / Typescript',
            version: '1.0.0',
            description: "API Docs For Products CMS"
        }
    },
    apis: [
        './src/router.ts'
    ]
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUIOptions: SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper{
            max-width: none;
        }
        .swagger-ui .topbar-wrapper .link{
            display: inline;
            width: 15.5%;
            content: url('http://localhost:4000/static/S.jpg');
            max-width: none;
            flex: unset;
        }
        .swagger-ui .topbar{
            background-color: #000;
        }
    `,
    customSiteTitle: 'Documentación Administrador Productos',
    customfavIcon: 'http://localhost:4000/static/S.jpg'
}

export default swaggerSpec
export {
    swaggerUIOptions
}