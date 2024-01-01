import { CartDetail } from "src/cart-detail/entities/cart-detail.entity";
import { Favorite } from "src/favorite/entities/favorite.entity";
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

    @OneToMany(type => CartDetail,cart_detail => cart_detail.user)
    cart_details:CartDetail[]

    @OneToMany(type => Favorite,favorite => favorite.user)
    favorites:Favorite[]

    @OneToMany(type => Order,order=>order.user)
    orders:Order[]

}
