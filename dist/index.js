"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basket_1 = __importDefault(require("./basket"));
const discounts_1 = require("./discounts");
console.log("\n------------------ERROR EXAMPLE----------------------------");
const basket = new basket_1.default();
basket.scan("NA_PROD"); //item does not exist, ignored
basket.scan("A0001");
basket.scan("A0001");
basket.addDiscount(new discounts_1.PercentDiscount("A0001", 10));
basket.addDiscount(new discounts_1.Buy1get1free("A0001")); //discount for this item was already applied, will be ignored
basket.total();
console.log("\n------------------EXAMPLE 1----------------------------");
const basket1 = new basket_1.default();
basket1.scan("A0002");
basket1.scan("A0001");
basket1.scan("A0002");
basket1.addDiscount(new discounts_1.PercentDiscount("A0001", 10));
basket1.total();
console.log("\n------------------EXAMPLE 2----------------------------");
const basket2 = new basket_1.default();
basket2.scan("A0002");
basket2.scan("A0001");
basket2.scan("A0002");
basket2.addDiscount(new discounts_1.Buy1get1free("A0002"));
basket2.total();
console.log("\n------------------EXAMPLE 3----------------------------");
const basket3 = new basket_1.default();
basket3.scan("A0002");
basket3.scan("A0001");
basket3.scan("A0003");
basket3.scan("A0002");
basket3.scan("A0004");
basket3.addDiscount(new discounts_1.PercentDiscount("A0003", 15));
basket3.addDiscount(new discounts_1.Buy1get1free("A0002"));
basket3.total();
//# sourceMappingURL=index.js.map