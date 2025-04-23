export class Product {

    // id !: string;
    // name_product !: string;
    // brand !: string;
    // price !: number;
    // description !: string;
    // image !: string;
    // ingredients !: string[];
    // how_to_use !: string;

    constructor(
        public id : string,
        public name_product: string,
        public brand: string,
        public price: number,
        public description: string,
        public image: string,
        public ingredients: string[],
        public how_to_use: string,
        public quantity: number ,
      ) {}
}
