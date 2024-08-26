import productSchema from "../models/schemas/productSchema";
import { Request, Response, NextFunction } from "express";

// Middleware function to validate the incoming request body against the product schema
export async function validationFunction(req: Request, res: Response, next: NextFunction) {
    // Validate the request body using the product schema
    const { error } = productSchema.validate(req.body);

    // If there is a validation error, respond with a 422 Unprocessable Entity status and details of the error
    if (error) {
        return res.status(422).json({
            message: 'Validation error',
            details: error.details.map(detail => detail.message) // Extract and map error messages
        });
    } else {
        // If validation is successful, proceed to the next middleware or route handler
        return next();
    }
}
