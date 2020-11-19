import {BasePage} from './basePage'
import {ProductDetailsModel} from '../models/productDetails'

export class ProductDetailsPage extends BasePage {

    public getProductPrice(): number {
        return parseFloat($('#box-product')
            .getAttribute('data-price'))
    }

    public  getProductName(): string {
        return $('h1.title').getText();
    }

    addToCart() {
        const currentItemsInCart = this.header.getQuantity();
        $('button[name="add_cart_product"]').click();
        browser.waitUntil(() => {
            return this.header.getQuantity() > currentItemsInCart});
    }

    getProductDetails() {
        const productDetails = new ProductDetailsModel();

        productDetails.name = this.getProductName();
        productDetails.price = this.getProductPrice();

        return productDetails;
    }
}

export const ProductDetails = new ProductDetailsPage();
