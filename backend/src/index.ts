import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { authenticationFunction } from './middlewares/authentication';
import dotenv from 'dotenv';
import { productsRouter } from './routes/productsRoutes';

// Load environment variables from a .env file
dotenv.config();

// Define the port number, defaulting to 8081 if not specified in environment variables
const PORT: number = parseInt(`${process.env.PORT}`) || 8081;

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware to log HTTP requests in a tiny format
app.use(morgan('tiny'));

// Apply the authentication middleware and use the productsRouter for routes starting with '/products'
app.use('/products', authenticationFunction, productsRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});
