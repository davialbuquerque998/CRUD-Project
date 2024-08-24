import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_HOST:string = `${process.env.MONGO_HOST}`;


let singleton:Db;



async function mongoConnection(): Promise<Db> {
    if(singleton) return singleton;

    const client:MongoClient = new MongoClient(MONGO_HOST);

    await client.connect();

    const db: Db = client.db("productswebapi");

    return db;
}

async function getProducts() {
    const db:Db = await mongoConnection();

    const products = db.collection("productscollection").find().toArray();

    return products;
}


export {
    getProducts
}