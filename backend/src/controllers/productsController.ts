import { Request, Response, NextFunction } from "express";
import { deleteProductDatabase, getProductsDatabase, insertProductDatabase, updateProductDatabase } from "../models/database/db";
import ProductModel from "../models/productModel";


async function getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await getProductsDatabase();

      return res.status(200).json({
        products
      });
    } catch (error) {
      return res.status(503).json({
        message:'Service Unavailable'
      });
    }
  }

async function insertProduct(req:Request, res:Response, next:NextFunction) {
    
    try {
        const product = req.body as ProductModel;
        const result = await insertProductDatabase(product);
        return res.status(201).json({
            result
        });
    } catch (error) {
        return res.status(400).json({
            message:'Bad request'
        });
    }
}


async function updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const name:string = req.body.name;
        const description:string = req.body.description;
        const price:number = Number(req.body.price);
        const isAvailable:boolean = Boolean(req.body.isAvailable);
        const id = req.params.id as string;

        const newProduct = new ProductModel(name, description, price, isAvailable);

        const result = await updateProductDatabase(id, newProduct);

        if (!result) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        return res.status(200).json({
            message: 'Product updated successfully',
            result
        });
    } catch (error) {
        return res.status(503).json({
            message: 'Service Unavailable'
        });
    }
}


async function deleteProduct(req:Request, res:Response, next:NextFunction) {
    try {
        const id:string = req.params.id;
        const result = await deleteProductDatabase(id);
        if (!result) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }
        return res.status(200).json({
            message: 'Product deleted successfully',
            result
        });
    } catch (error) {
        return res.status(503).json({
            message: 'Service Unavailable'
        });
    }
}



export {
    getProducts,
    insertProduct,
    updateProduct,
    deleteProduct
}