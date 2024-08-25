import { Router, Request, Response, NextFunction } from "express";
import { getProducts, insertProduct } from "../controllers/productsController";
import { validationFunction } from "../middlewares/validationMiddleware";


const productsRouter: Router = Router();

productsRouter.get("/", getProducts);
productsRouter.post("/", validationFunction, insertProduct);

export { productsRouter };
