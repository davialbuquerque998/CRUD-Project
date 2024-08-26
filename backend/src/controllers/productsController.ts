import { Request, Response, NextFunction } from "express";
import { 
  deleteProductDatabase, 
  getProductsDatabase, 
  insertProductDatabase, 
  updateProductDatabase 
} from "../models/database/db";
import ProductModel from "../models/productModel";

// Controller to handle fetching all products from the database
async function getProducts(req: Request, res: Response, next: NextFunction) {
    try {
        // Retrieve all products from the database
        const products = await getProductsDatabase();

        // Respond with the retrieved products
        return res.status(200).json({
            products
        });
    } catch (error) {
        // Handle errors and respond with an internal server error status
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

// Controller to handle inserting a new product into the database
async function insertProduct(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract the product details from the request body and type it as ProductModel
        const product = req.body as ProductModel;

        // Insert the product into the database
        const result = await insertProductDatabase(product);

        // Respond with the result of the insertion and a created status
        return res.status(201).json({
            result
        });
    } catch (error) {
        // Handle errors and respond with an internal server error status
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

// Controller to handle updating an existing product in the database
async function updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract product details from the request body
        const name: string = req.body.name;
        const description: string = req.body.description;
        const price: number = Number(req.body.price);
        const isAvailable: boolean = Boolean(req.body.isAvailable);
        const id = req.params.id as string;

        // Create a new product model instance with the updated details
        const newProduct = new ProductModel(name, description, price, isAvailable);

        // Update the product in the database by its ID
        const result = await updateProductDatabase(id, newProduct);

        // If the product was not found, respond with a 404 status
        if (!result) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Respond with a success message and the updated product
        return res.status(200).json({
            message: 'Product updated successfully',
            result
        });
    } catch (error) {
        // Handle errors and respond with an internal server error status
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

// Controller to handle deleting a product from the database
async function deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract the product ID from the request parameters
        const id: string = req.params.id;

        // Delete the product from the database by its ID
        const result = await deleteProductDatabase(id);

        // If the product was not found, respond with a 404 status
        if (!result) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        // Respond with a success message and the result of the deletion
        return res.status(200).json({
            message: 'Product deleted successfully',
            result
        });
    } catch (error) {
        // Handle errors and respond with an internal server error status
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

// Export all the controller functions for use in routes
export {
    getProducts,
    insertProduct,
    updateProduct,
    deleteProduct
}
