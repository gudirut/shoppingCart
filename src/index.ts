import Basket from "./basket";
import { Buy1get1free, PercentDiscount } from "./discounts";


console.log("\n------------------ERROR EXAMPLE----------------------------")
const basket = new Basket();
basket.scan("NA_PROD"); //item does not exist, ignored
basket.scan("A0001");
basket.scan("A0001");
basket.addDiscount(new PercentDiscount("A0001", 10));
basket.addDiscount(new Buy1get1free("A0001")); //discount for this item was already applied, will be ignored
basket.total();

console.log("\n------------------EXAMPLE 1----------------------------")
const basket1 = new Basket();
basket1.scan("A0002");
basket1.scan("A0001");
basket1.scan("A0002");
basket1.addDiscount(new PercentDiscount("A0001", 10));
basket1.total();

console.log("\n------------------EXAMPLE 2----------------------------")
const basket2 = new Basket();
basket2.scan("A0002");
basket2.scan("A0001");
basket2.scan("A0002");
basket2.addDiscount(new Buy1get1free("A0002"));
basket2.total();

console.log("\n------------------EXAMPLE 3----------------------------")
const basket3 = new Basket();
basket3.scan("A0002");
basket3.scan("A0001");
basket3.scan("A0003");
basket3.scan("A0002");
basket3.scan("A0004");
basket3.addDiscount(new PercentDiscount("A0003", 15));
basket3.addDiscount(new Buy1get1free("A0002"));
basket3.total();