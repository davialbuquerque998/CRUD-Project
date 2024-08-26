import { Request, Response, NextFunction } from 'express';

// Middleware function to handle authentication
async function authenticationFunction(req: Request, res: Response, next: NextFunction) {
    // Check if the 'Authorization' header is present in the request
    if (!req.headers['authorization']) {
        // If not, respond with a 400 Bad Request status and an appropriate message
        return res.status(400).json({
            message: 'Authorization header is missing'
        });
    }

    // Check if the 'Authorization' header contains the correct password
    if (req.headers['authorization'] === 'super-secret-password') {
        // If the password is correct, proceed to the next middleware or route handler
        return next();
    } else {
        // If the password is incorrect, respond with a 401 Unauthorized status and an appropriate message
        return res.status(401).json({
            message: 'Access denied. Incorrect password. Please try again.'
        });
    }
}

// Export the authentication function for use as middleware in routes
export {
    authenticationFunction
}
