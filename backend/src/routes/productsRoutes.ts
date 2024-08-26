import { Router, Request, Response, NextFunction } from "express";
import { deleteProduct, getProducts, insertProduct, updateProduct } from "../controllers/productsController";
import { validationFunction } from "../middlewares/validationMiddleware";


const productsRouter: Router = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", validationFunction, insertProduct);
productsRouter.put("/:id", validationFunction, updateProduct);
productsRouter.delete("/:id", deleteProduct);

export { productsRouter };
