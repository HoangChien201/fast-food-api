import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(type => User,user => user.orders)
    user:User

    @OneToMany(type => OrderDetail,order_detail => order_detail.order)
    order_details:OrderDetail[]

    @Column({type:Date})
    order_date:Date

    @Column()
    payment:string

    @Column()
    address:string
}
