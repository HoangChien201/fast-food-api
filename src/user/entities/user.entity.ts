import { Order } from "src/order/entities/order.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
    
    @Column()
    password:string;

    @Column()
    fullname:string;

    @Column()
    avatar:string;

    @Column()
    phone:string;

    @Column()
    role:number;

    @Column()
    gender:string;

    @Column()
    address:string;

    @OneToMany(type => Order,order=>order.user)
    orders:Order[]
}
