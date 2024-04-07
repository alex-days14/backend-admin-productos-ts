import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProductById, getAllProducts, getProduct, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors, /* validateCreateProduct */ } from "./middlewares"

const router = Router()

//Routing

router.route("/")
    .get(getAllProducts)
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

router.route("/:id")

.get( 
    param('id').isInt().withMessage("ID no válido"), 
    handleInputErrors, 
    getProduct
)

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

.patch(
    param('id').isInt().withMessage("ID no válido"),
    handleInputErrors, 
    updateAvailability
)

.delete(
    param('id').isInt().withMessage("ID no válido"),
    handleInputErrors,
    deleteProductById 
)

export default router