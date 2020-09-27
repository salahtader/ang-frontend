import {Product} from "./product"

export class CartItem {
    _id:string
    id:number
    productId: Product
    productTitle:string
    qty:number
    price:number

    constructor(id:number,product: Product, qty=1){
        this.id = id
        this.productId= product
        this.productTitle = product.name
        this.qty= qty
        this.price = product.price
    }
}
