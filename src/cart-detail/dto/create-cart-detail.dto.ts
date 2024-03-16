import { Product } from "src/product/entities/product.entity";

export class CreateCartDetailDto {
    user_id:number;
    product_id:number;
    instruction:string;
    quantity:number
}
