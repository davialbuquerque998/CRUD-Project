import { Router, Request, Response, NextFunction } from "express";
import { deleteProduct, getProduct, getProducts, insertProduct, updateProduct } from "../controllers/productsController";
import { validationFunction } from "../middlewares/validationMiddleware";

// Create a new Router instance for handling product-related routes
const productsRouter: Router = Router();

// Route to get all products
productsRouter.get("/", getProducts);

// Route to get one product
productsRouter.get("/:id", getProduct);

// Route to insert a new product with validation middleware
productsRouter.post("/", validationFunction, insertProduct);

// Route to update an existing product by ID with validation middleware
productsRouter.put("/:id", validationFunction, updateProduct);

// Route to delete a product by ID
productsRouter.delete("/:id", deleteProduct);

// Export the router instance for use in other parts of the application
export { productsRouter };

