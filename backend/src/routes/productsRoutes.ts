import { Router, Request, Response, NextFunction } from "express";
import { getProducts } from "../models/database/db";

const productsRouter: Router = Router();

productsRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await getProducts();

      return res.status(200).json({
        products
      });
    } catch (error) {
      return res.status(503).json({
        statusCode:503,
        message:'Service Unavailable'
      });
    }
  }
);

export { productsRouter };
