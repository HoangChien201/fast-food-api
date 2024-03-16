import { CartDetail } from "src/cart-detail/entities/cart-detail.entity"
import { User } from "src/user/entities/user.entity"

export class CreateOrderDto {
    user:number
    payment:boolean
    address:string
    methodPayment:string
    expectedTime:string
}
