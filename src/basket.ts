import data from './data/inventory.json';
import { Discount } from './discounts';

class Basket{
    private itemsInBasket: { [id: string]: number } = {}; //stores qty of each item in the basket
    private inventory: Array<Product> = data; //inventory of all available items
    private discounts: Array<Discount> = []; //applied discounts

    /**
     * Checks if the item is in our inventory, if yes, it's added to the basket
     * @param id Id of the product
     * @returns 
     */
    public scan(id: string){
        const product = this.inventory.find(product => product.id === id); //check if item is in our inventory
        if(!product){
            console.warn(`Product ${ id } does not exist.`)
            return;
        }
        if(product.id in this.itemsInBasket){ //only change quantity?
            this.itemsInBasket[product.id] += 1; //add 1 to the quantity in the basket
        } else {
            this.itemsInBasket[product.id] = 1; //add item with quantity 1 to basket
        }
    }

    /**
     * adds a discount object. At the moment, multiple discounts can be applied (for different items only)
     * 
     * @param discount Object that calculates the discount
     */
    public addDiscount(discount: Discount){
        //check if we have applied a discount for that item already
        if(!this.discounts.find(d => d.getDiscountedItem() === discount.getDiscountedItem())){
            //if not, add it
            this.discounts.push(discount);
        } else {
            console.warn(`Already applied a discount for ${discount.getDiscountedItem()}`)
        }
    }

    /**
     * Calculate and output the total value, considering the applied discounts
     * @param showDetails flag, if details should be logged in the output
     */
    public total(showDetails: boolean = true){
        let total: number = 0;
        if(showDetails) console.log("\n---Items in Basket---")
        for(const id in this.itemsInBasket){ //sum the prices for each items (times the qty)
            const prod = this.inventory.find(product => product.id === id)
            if(showDetails) console.log(`${id}: ${this.itemsInBasket[id]} (${prod.price.toFixed(2)}€ each)`)
            total += prod.price * this.itemsInBasket[id]; //add price to the total price
        }
        if(showDetails && this.discounts.length > 0) console.log("\n---Applied Discounts---")
        for(const discount of this.discounts){
            const value = discount.getDiscountValue(this.itemsInBasket);
            total -= value;
        }
        console.log(`\nTotal: ${total.toFixed(2)}€`)
    }
}

export default Basket; 