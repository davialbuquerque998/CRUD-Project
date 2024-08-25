import { Request, Response, NextFunction } from "express";
import { getProductsDatabase, insertProductDatabase } from "../models/database/db";
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


export {
    getProducts,
    insertProduct
}