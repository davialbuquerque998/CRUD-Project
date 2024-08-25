import productSchema from "../models/schemas/productSchema";
import { Request, Response, NextFunction } from "express";

export async function validationFunction(req:Request, res:Response, next:NextFunction) {
    const {error} = productSchema.validate(req.body);

    if(error){
        return res.status(422).json(error); 
    }
    else {
        return next();
    }
}