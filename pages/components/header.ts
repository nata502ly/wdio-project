export class Header {
    // get container() {return $('#header')}

    getQuantity():number {
        let quantity = $('#header').$('#cart .quantity').getText();
        return parseInt(quantity)
    }
}
