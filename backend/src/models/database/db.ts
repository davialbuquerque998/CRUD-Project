import { Db, MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import ProductModel from '../productModel';
dotenv.config();

// Load environment variables for MongoDB connection details
const MONGO_HOST: string = `${process.env.MONGO_HOST}`;
const MONGO_DATABASE: string = `${process.env.MONGO_DATABASE}`;
const MONGO_COLLECTION: string = `${process.env.MONGO_COLLECTION}`;
let singleton: Db; // Singleton pattern to ensure only one connection instance

// Function to establish a connection to MongoDB and return the database instance
async function mongoConnection(): Promise<Db> {
    // Return the existing database instance if already connected
    if (singleton) return singleton;

    // Create a new MongoClient instance with the MongoDB host URL
    const client: MongoClient = new MongoClient(MONGO_HOST);

    // Connect to MongoDB
    await client.connect();

    // Get the database instance and store it in the singleton variable
    const db: Db = client.db(MONGO_DATABASE);

    return db;
}

// Function to retrieve all products from the MongoDB collection
async function getProductsDatabase() {
    const db: Db = await mongoConnection();

    // Fetch all products from the specified collection and return as an array
    const products = db.collection(MONGO_COLLECTION).find().toArray();

    return products;
}

// Function to retrieve a single product from the MongoDB collection using its id as a filter
async function getProductDatabase(id:string) {
    const db: Db = await mongoConnection();

    // Convert the string ID to an ObjectId
    const objectId: ObjectId = new ObjectId(id);

    //Fetch the desired product based on its id
    const result = await db.collection(MONGO_COLLECTION).findOne({_id:objectId});

    return result;
}

// Function to insert a new product into the MongoDB collection
async function insertProductDatabase(product: ProductModel) {
    const db: Db = await mongoConnection();

    // Insert the product document into the collection
    const result = await db.collection(MONGO_COLLECTION).insertOne(product);

    return result;
}

// Function to update an existing product in the MongoDB collection by ID
async function updateProductDatabase(id: string, product: ProductModel) {
    const db: Db = await mongoConnection();

    // Convert the string ID to an ObjectId
    const objectId: ObjectId = new ObjectId(id);

    // Update the product document in the collection using the provided ID
    const result = await db.collection(MONGO_COLLECTION).updateOne({ _id: objectId }, { $set: product });

    return result;
}

// Function to delete a product from the MongoDB collection by ID
async function deleteProductDatabase(id: string) {
    const db: Db = await mongoConnection();

    // Convert the string ID to an ObjectId
    const objectId: ObjectId = new ObjectId(id);

    // Delete the product document from the collection using the provided ID
    const result = await db.collection(MONGO_COLLECTION).deleteOne({ _id: objectId });

    return result;
}

// Export the database functions for use in other parts of the application
export {
    getProductsDatabase,
    getProductDatabase,
    insertProductDatabase,
    updateProductDatabase,
    deleteProductDatabase
}
