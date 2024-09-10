import express, {Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT:number = parseInt(`${process.env.PORT}`) || 5000;

app.get("/products", (req:Request, res:Response)=>{
    return res.send("Server is running");
});


app.listen(PORT, ()=>{
    console.log(`App is running at http://127.0.0.1:${PORT}`);
});