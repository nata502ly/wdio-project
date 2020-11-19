import {expect} from 'chai'
import { App } from "../../pages/application";

describe('Cart', function () {
    beforeEach(function () {
        browser.deleteAllCookies()
    });
    it('should add item', function(){
        App.product.open('/rubber-ducks-c-1/red-duck-p-3');
        App.product.addToCart();
        App.checkout.open();
        expect(App.checkout.isItemsInCart()).to.be.true;
    });

    it('should add correct item', function(){
        App.product.open('/rubber-ducks-c-1/red-duck-p-3');
        const productDetails = App.product.getProductDetails();

        console.log('product details', productDetails.toString());

        App.product.addToCart();

        App.checkout.open();
        expect(App.checkout.isItemsInCart()).to.be.true;

        const productNameInCart = App.checkout.shoppingCart.items[0].getProductName();
        const productPriceInCart = App.checkout.shoppingCart.items[0].getProductPrice();

        expect(App.checkout.shoppingCart.items.length).to.eq(1);

        console.log(productNameInCart);
        console.log(productPriceInCart);

        expect(productNameInCart).to.eq(productDetails.name);
        expect(productPriceInCart).to.eq(parseFloat(productDetails.price.toString()).toFixed(2))



    })
});
