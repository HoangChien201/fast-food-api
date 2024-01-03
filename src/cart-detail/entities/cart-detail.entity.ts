import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartDetail {
    @PrimaryGeneratedColumn()
    id:number

    @OneToOne(type => Product)
    product:Product

    @OneToMany(type => User,user => user.cart_details)
    user:User

    @Column()
    instruction:string
}
