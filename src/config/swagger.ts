import swaggerJSDoc from "swagger-jsdoc";

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

export default swaggerSpec