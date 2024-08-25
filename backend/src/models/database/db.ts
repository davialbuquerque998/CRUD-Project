import { Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import ProductModel from '../productModel';
dotenv.config();

const MONGO_HOST:string = `${process.env.MONGO_HOST}`;
const MONGO_DATABASE:string = `${process.env.MONGO_DATABASE}`;
const MONGO_COLLECTION:string = `${process.env.MONGO_COLLECTION}`;
let singleton:Db;



async function mongoConnection(): Promise<Db> {
    if(singleton) return singleton;

    const client:MongoClient = new MongoClient(MONGO_HOST);

    await client.connect();

    const db: Db = client.db(MONGO_DATABASE);

    return db;
}

async function getProductsDatabase() {
    const db:Db = await mongoConnection();

    const products = db.collection(MONGO_COLLECTION).find().toArray();

    return products;
}

async function insertProductDatabase(product:ProductModel) {
    const db:Db = await mongoConnection();

    const result = await db.collection(MONGO_COLLECTION).insertOne(product);

    return result;
}


export {
    getProductsDatabase,
    insertProductDatabase
}