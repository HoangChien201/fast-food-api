import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    product_count:number

    @Column()
    instruction:string

    @OneToOne(type => Product)
    product:Product

    @ManyToOne(type => Order,order => order.order_details)
    order:Order
}
