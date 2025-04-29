export class Product {

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
