import {BasePage} from '../basePage';
import {ShoppingCartPage} from "./components/shoppingCart";


export class CheckoutPage extends BasePage {
    shoppingCart = new ShoppingCartPage();


    private get isNoItemsLabel(){return $('.cart.wrapper em')
    }

    open() {
        super.open('/checkout');
        browser.pause(10000);
    }

    isItemsInCart() {
        return !this.isNoItemsInCart();
    }

    isNoItemsInCart(){
        if(this.isNoItemsLabel.isDisplayed()){
            return this.isNoItemsLabel.getText().includes('There are no items')
        } else {
            return false
        }
    }

}



export const Checkout = new CheckoutPage();


