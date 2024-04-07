import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            /* order: [
                ['price', 'DESC']
            ],
            limit: 2,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            } */
        })
        res.json({data: products})
    } catch (error) {
        res.json({error: "Fallo Interno"})
        console.log(error)
    }
}

export const getProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id)
        if(!product) return res.status(404).json({error: "Producto no encontrado"})
        res.json({data: product})
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({data: product}) 
    } catch (error) {
        res.json({error: "Fallo Interno"})
        console.log(error)
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id)
        // Validar si el producto existe
        if(!product) return res.status(404).json({error: "Producto no encontrado"})
        //Actualizar producto con los nuevos datos
        await product.update(req.body)
        res.json({data: product})
    } catch (error) {
        res.json({error: "Fallo Interno"})
        console.log(error)
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id)
        // Validar si el producto existe
        if(!product) return res.status(404).json({error: "Producto no encontrado"})
        //Modificar disponibilidad
        product.availability = !product.dataValues.availability
        await product.save()
        res.json({data: product})
    } catch (error) {
        res.json({error: "Fallo Interno"})
        console.log(error)
    }
}

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const product = await Product.findByPk(req.params.id)
        // Validar si el producto existe
        if(!product) return res.status(404).json({error: "Producto no encontrado"})
        //Eliminar producto
        await product.destroy()
        res.json({data: "Producto eliminado"})
    } catch (error) {
        res.json({error: "Fallo Interno"})
        console.log(error)
    }
}