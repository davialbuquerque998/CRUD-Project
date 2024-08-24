import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { authenticationFunction } from './middlewares/authentication';
import dotenv from 'dotenv';
import { productsRouter } from './routes/productsRoutes';
dotenv.config();

const PORT:number = parseInt(`${process.env.PORT}`) || 8081;

const app = express();

//required middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));


app.use('/products', authenticationFunction, productsRouter);


app.listen(PORT, ()=>{
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});