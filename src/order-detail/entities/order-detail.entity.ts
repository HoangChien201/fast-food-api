import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderDetail {
    @PrimaryColumn()
    order_id:number

    @Column()
    quantity:number

    @PrimaryColumn()
    product_id:number
}
