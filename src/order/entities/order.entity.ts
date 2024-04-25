import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => User, user => user.orders)
    user: User | number

    @CreateDateColumn()// Recommended
    order_date: Date;

    @Column()
    payment: boolean

    @Column()
    address: string

    @Column()
    methodPayment:string
    
    @Column()
    expectedTime:string

    @Column()
    charges:number
}
