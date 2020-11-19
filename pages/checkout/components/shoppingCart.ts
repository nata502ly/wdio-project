export class ShoppingCartPage {

    private get container(): WebdriverIO.Element {
        return $('#box-checkout-cart')
    }

    public get items(): Item[] {
        return this.container.$$('table.items tr.item').map(item=>{
            return new Item(item)}
        )
    }

    public getItemByName(name: string): Item {
        return <Item>this.items.find(item => item.getProductName().includes(name))
    }
}

class Item {
    container: { getAttribute: (arg0: string) => string | number; };

    constructor(itemContainer: WebdriverIO.Element) {
        this.container = itemContainer
    }

    public getProductName(): string {
        return <string>this.container.getAttribute('data-name')
    }

    public getProductPrice(): number {
        return <number>this.container.getAttribute('data-price')
    }
}

export const shoppingCart = new ShoppingCartPage();
