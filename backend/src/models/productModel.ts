

export default class ProductModel {

    name:string;
    description:string;
    price:number;
    isAvailable:boolean;

    constructor(name:string, description:string, price:number, isAvailable:boolean) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.isAvailable = isAvailable;
    }
}