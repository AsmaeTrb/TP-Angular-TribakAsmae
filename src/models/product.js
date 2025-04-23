"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
var Product = /** @class */ (function () {
    // id !: string;
    // name_product !: string;
    // brand !: string;
    // price !: number;
    // description !: string;
    // image !: string;
    // ingredients !: string[];
    // how_to_use !: string;
    function Product(id, name_product, brand, price, description, image, ingredients, how_to_use) {
        this.id = id;
        this.name_product = name_product;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.image = image;
        this.ingredients = ingredients;
        this.how_to_use = how_to_use;
    }
    return Product;
}());
exports.Product = Product;
