"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_json_1 = __importDefault(require("./data/inventory.json"));
class Basket {
    constructor() {
        this.itemsInBasket = {}; //stores qty of each item in the basket
        this.inventory = inventory_json_1.default; //inventory of all available items
        this.discounts = []; //applied discounts
    }
    /**
     * Checks if the item is in our inventory, if yes, it's added to the basket
     * @param id Id of the product
     * @returns
     */
    scan(id) {
        const product = this.inventory.find(product => product.id === id); //check if item is in our inventory
        if (!product) {
            console.warn(`Product ${id} does not exist.`);
            return;
        }
        if (product.id in this.itemsInBasket) { //only change quantity?
            this.itemsInBasket[product.id] += 1; //add 1 to the quantity in the basket
        }
        else {
            this.itemsInBasket[product.id] = 1; //add item with quantity 1 to basket
        }
    }
    /**
     * adds a discount object. At the moment, multiple discounts can be applied (for different items only)
     *
     * @param discount Object that calculates the discount
     */
    addDiscount(discount) {
        //check if we have applied a discount for that item already
        if (!this.discounts.find(d => d.getDiscountedItem() === discount.getDiscountedItem())) {
            //if not, add it
            this.discounts.push(discount);
        }
        else {
            console.warn(`Already applied a discount for ${discount.getDiscountedItem()}`);
        }
    }
    /**
     * Calculate and output the total value, considering the applied discounts
     * @param showDetails flag, if details should be logged in the output
     */
    total(showDetails = true) {
        let total = 0;
        if (showDetails)
            console.log("\n---Items in Basket---");
        for (const id in this.itemsInBasket) { //sum the prices for each items (times the qty)
            const prod = this.inventory.find(product => product.id === id);
            if (showDetails)
                console.log(`${id}: ${this.itemsInBasket[id]} (${prod.price.toFixed(2)}€ each)`);
            total += prod.price * this.itemsInBasket[id]; //add price to the total price
        }
        if (showDetails && this.discounts.length > 0)
            console.log("\n---Applied Discounts---");
        for (const discount of this.discounts) {
            const value = discount.getDiscountValue(this.itemsInBasket);
            total -= value;
        }
        console.log(`\nTotal: ${total.toFixed(2)}€`);
    }
}
exports.default = Basket;
//# sourceMappingURL=basket.js.map