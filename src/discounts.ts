import data from './data/inventory.json'

abstract class Discount{
    protected inventory: Array<Product> = data;
    protected id: string;

    constructor(id:string){
        this.id = id;
    }

    getDiscountedItem(): string {
        return this.id;
    }
    
    /**
     * Will be implemented in subclasses. Calculates the value that has to be subtracted from the total according to this discount
     * @param items contains all items & quantities currently in the basket
     */
    abstract getDiscountValue(items?: { [id: string]: number }): number;
}

/**
 * If we buy 1 item, we get the second item for free.
 * (If we buy e.g. 3 items, we still only get 1 item for free)
 */
class Buy1get1free extends Discount{
    getDiscountValue(items?: { [id: string]: number; }): number {
         //only applies if we have at least 2 of this item, does not stack for 4,6,...
        if(this.id in items && items[this.id] >= 2){
            const value = this.inventory.find(product => product.id === this.id).price; //discount value is the price of 1 item
            console.log(`Buy 1 and get 1 free of Item ${this.id}: -${value.toFixed(2)}€`);
            return value
        }
    }
}

/**
 * Applies a given percentage discount on the specified item
 */
class PercentDiscount extends Discount{
    private percent: number;

    constructor(id:string, percent: number){
        super(id);
        this.percent = percent;
    }

    getDiscountValue(items?: { [id: string]: number; }): number {
        if(this.id in items){
            //value = price each * quantity * 0.10 (--> for 10% off)
            const value = this.inventory.find(product => product.id === this.id).price * items[this.id] * this.percent/100;
            console.log(`${this.percent}% off of Item ${this.id}: -${value.toFixed(2)}€`);
            return value
        }
    }
}

export { Discount, Buy1get1free, PercentDiscount };