"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentDiscount = exports.Buy1get1free = exports.Discount = void 0;
const inventory_json_1 = __importDefault(require("./data/inventory.json"));
class Discount {
    constructor(id) {
        this.inventory = inventory_json_1.default;
        this.id = id;
    }
    getDiscountedItem() {
        return this.id;
    }
}
exports.Discount = Discount;
/**
 * If we buy 1 item, we get the second item for free.
 * (If we buy e.g. 3 items, we still only get 1 item for free)
 */
class Buy1get1free extends Discount {
    getDiscountValue(items) {
        //only applies if we have at least 2 of this item, does not stack for 4,6,...
        if (this.id in items && items[this.id] >= 2) {
            const value = this.inventory.find(product => product.id === this.id).price; //discount value is the price of 1 item
            console.log(`Buy 1 and get 1 free of Item ${this.id}: -${value.toFixed(2)}€`);
            return value;
        }
    }
}
exports.Buy1get1free = Buy1get1free;
/**
 * Applies a given percentage discount on the specified item
 */
class PercentDiscount extends Discount {
    constructor(id, percent) {
        super(id);
        this.percent = percent;
    }
    getDiscountValue(items) {
        if (this.id in items) {
            //value = price each * quantity * 0.10 (--> for 10% off)
            const value = this.inventory.find(product => product.id === this.id).price * items[this.id] * this.percent / 100;
            console.log(`${this.percent}% off of Item ${this.id}: -${value.toFixed(2)}€`);
            return value;
        }
    }
}
exports.PercentDiscount = PercentDiscount;
//# sourceMappingURL=discounts.js.map