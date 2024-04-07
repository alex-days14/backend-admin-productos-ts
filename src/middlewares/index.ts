import { Request, Response, NextFunction } from "express"
import { body, validationResult } from "express-validator"

/* export const validateCreateProduct = (req: Request, res: Response, next: NextFunction) => {
    //Validación
    body("name")
        .notEmpty().withMessage("Nombre de producto es obligatorio")
    body("price")
        .isNumeric().withMessage("Precio no válido")
        .notEmpty().withMessage("Precio de producto es obligatorio")
        .custom((value) => value > 0).withMessage('Precio no válido')
    next()
} */

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) =>{
    //Errores
    let errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()})
    next()
}