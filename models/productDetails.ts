export class ProductDetailsModel {
    name: string = '';
    price: number =0;

    toString() {
        return JSON.stringify(this, null, 2)
    }
}
