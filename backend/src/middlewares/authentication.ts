import {Request, Response, NextFunction} from 'express';

async function authenticationFunction(req:Request, res:Response, next:NextFunction) {
    if(req.headers['authorization'] === 'super-secret-password'){
        return next(); 
    }

    else {
        return res.status(401).json({
            message:'Access denied. The password is not correct. Try again'
        }); 
    }
}


export {
    authenticationFunction 
}