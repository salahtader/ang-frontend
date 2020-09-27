import { Category } from "./category"

export class Product {
    _id:string
    id:number
    name:string
    description: string
    price:number
    imageUrl:string
    category:Category

    constructor(id,name:string,description="",category:Category,price=0,imageUrl="https://www.maskecubos.com/4057-large_default/z-cube-tirelire.jpg"){
        this.id=id
        this.name=name
        this.price=price
        this.description=description
        this.category=category
        this.imageUrl=imageUrl
    }

    }
