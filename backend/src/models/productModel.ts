// Define a class to represent a product in the application
export default class ProductModel {

    // Properties of the ProductModel class
    name: string;
    description: string;
    price: number;
    isAvailable: boolean;

    // Constructor to initialize a new instance of the ProductModel class
    constructor(name: string, description: string, price: number, isAvailable: boolean) {
        // Assign the constructor parameters to the class properties
        this.name = name;
        this.description = description;
        this.price = price;
        this.isAvailable = isAvailable;
    }
}
