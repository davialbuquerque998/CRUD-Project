

export default class ProductModel {

    name:string;
    description:string;
    price:number;
    year:number;
    isAvailable:boolean;

    constructor(name:string, description:string, price:number, year:number, isAvailable:boolean) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.year = year;
        this.isAvailable = isAvailable;
    }
}