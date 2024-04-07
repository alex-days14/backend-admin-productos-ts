import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProductById, getAllProducts, getProduct, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors, /* validateCreateProduct */ } from "./middlewares"

const router = Router()

/**
    * @swagger
    * components:
    *   schemas:
    *       Product:
    *           type: object
    *           properties: 
    *               id:
    *                   type: integer
    *                   description: The Product ID
    *                   example: 1
    *               name:
    *                   type: string
    *                   description: The Product Name
    *                   example: Termo Borregos
    *               price:
    *                   type: float
    *                   description: The Product Price
    *                   example: 899
    *               availability:
    *                   type: boolean
    *                   description: The Product Availability State
    *                   example: true
*/
/**
    * @swagger
    * components:
    *   schemas:
    *       ProductCreated:
    *           type: object
    *           properties: 
    *               data:
    *                   type: object
    *                   properties:
    *                       id:
    *                           type: integer
    *                           description: The Product ID
    *                           example: 1
    *                       name:
    *                           type: string
    *                           description: The Product Name
    *                           example: Termo Borregos
    *                       price:
    *                           type: float
    *                           description: The Product Price
    *                           example: 899
    *                       availability:
    *                           type: boolean
    *                           description: The Product Availability State
    *                           example: true
    *                       updatedAt:
    *                           type: date
    *                           example: 2024-04-07T18:36:57.716Z
    *                       createdAt:
    *                           type: date
    *                           example: 2024-04-07T18:36:57.716Z
*/
/**
    * @swagger
    * components:
    *   schemas:
    *       NotFound:
    *           type: object
    *           properties: 
    *               error:
    *                   type: string
    *                   description: The error response
    *                   example: Producto no encontrado
*/

// Routing
/**
    * @swagger
    * /api/products:
    *   get:
    *       summary: Get an array with all the products
    *       tags:
    *           - Products
    *       description: Returns the collection of products
    *       responses: 
    *           200:
    *               description: Successful response
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: array
    *                           items:
    *                               $ref: '#/components/schemas/Product' 
    *       
 */
router.route("/")
    .get(getAllProducts)

/**
    * @swagger
    * /api/products:
    *   post:
    *       summary: Create a new product
    *       description: Add a new product object and returns the created product
    *       tags:
    *           - Products
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                           name: 
    *                               type: string
    *                               description: The Product Name
    *                               example: New Product
    *                           price: 
    *                               type: integer
    *                               description: The Product Price
    *                               example: 2000
    * 
    *       responses:
    *           201:
    *               description: Product Created Succesfully
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/ProductCreated'
    *           400:
    *               description: Bad Request - Invalid Payload
*/
    .post(
        //Validación
        body("name")
            .notEmpty().withMessage("Nombre de producto es obligatorio"),
        body("price")
            .isNumeric().withMessage("Precio no válido")
            .notEmpty().withMessage("Precio de producto es obligatorio")
            .custom((value) => value > 0).withMessage('Precio no válido'),

        handleInputErrors,
        createProduct
)

/**
    * @swagger
    * /api/products/{id}:
    *   get:
    *       summary: Get a product by its ID
    *       tags:
    *           - Products
    *       description: Returns an object with the product found
    *       parameters:
    *         - in: path
    *           name: id
    *           description: The product ID you're trying to find
    *           required: true
    *           schema:
    *               type: integer
    *       responses: 
    *           200:
    *               description: Successful response
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/ProductCreated'
    *           404:
    *               description: Product not found
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/NotFound'
    *           400:
    *               description: Bad request
    *       
 */
router.route("/:id")

.get( 
    param('id').isInt().withMessage("ID no válido"), 
    handleInputErrors, 
    getProduct
)

/**
    * @swagger:
    * /api/products/{id}:
    *   put:
    *       summary: Update a product 
    *       description: Updates a existent product by its id and returns the updated product
    *       tags: 
    *           - Products
    *       parameters:
    *         - in: path
    *           name: id
    *           description: The product ID you're trying to find
    *           required: true
    *           schema:
    *               type: integer
    *       requestBody:
    *           required: true
    *           content:
    *               application/json:
    *                   schema:
    *                       type: object
    *                       properties:
    *                           name: 
    *                               type: string
    *                               description: The Product Name
    *                               example: New Product
    *                           price: 
    *                               type: integer
    *                               description: The Product Price
    *                               example: 2000
    *                           availability: 
    *                               type: boolean
    *                               description: The Product Availability
    *                               example: true
    *       
    *       responses:
    *           200:
    *               description: Product Updated Succesfully
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/ProductCreated' 
    *           404:
    *               description: Product not found
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/NotFound'
    *           400:
    *               description: Bad Request - Invalid Payload
    *               
*/

.put(
    param('id').isInt().withMessage("ID no válido"),
    body("name")
        .notEmpty().withMessage("Nombre de producto es obligatorio")
        .isString().withMessage('Nombre no válido'),
    body("price")
        .isNumeric().withMessage("Precio no válido")
        .notEmpty().withMessage("Precio de producto es obligatorio")
        .custom((value) => value > 0).withMessage('Precio no válido'),
    body("availability")
        .notEmpty().withMessage("Disponibilidad es obligatorio")
        .isBoolean().withMessage("No válido"),
    handleInputErrors,
    updateProduct
)

/**
    * @swagger:
    * /api/products/{id}:
    *   patch:
    *       summary: Change state of availability
    *       description: Toggles the state of availability (true or false) of a certain product retrieved by ID
    *       tags: 
    *           - Products
    *       parameters:
    *         - in: path
    *           name: id
    *           description: The product ID you're trying to find
    *           required: true
    *           schema:
    *               type: integer
    *       responses:
    *           201:
    *               description: Product Availability Updated Succesfully
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/ProductCreated' 
    *           404:
    *               description: Product not found
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/NotFound'
    *           400:
    *               description: Bad Request - Invalid Payload
    *               
*/

.patch(
    param('id').isInt().withMessage("ID no válido"),
    handleInputErrors, 
    updateAvailability
)

/**
    * @swagger:
    * /api/products/{id}:
    *   delete:
    *       summary: Delete a product from collection
    *       description: Destroys permanently a product by its ID
    *       tags: 
    *           - Products
    *       parameters:
    *         - in: path
    *           name: id
    *           description: The product ID you're trying to find
    *           required: true
    *           schema:
    *               type: integer
    *       responses:
    *           200:
    *               description: Product Deleted Succesfully
    *               content:
    *                   application/json:
    *                       schema:
    *                           type: object
    *                           properties:
    *                               data: 
    *                                   type: string
    *                                   example: "Producto eliminado"
    *           404:
    *               description: Product not found
    *               content:
    *                   application/json:
    *                       schema:
    *                           $ref: '#/components/schemas/NotFound'
    *           400:
    *               description: Bad Request - Invalid Payload
    *               
*/

.delete(
    param('id').isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProductById 
)

export default router