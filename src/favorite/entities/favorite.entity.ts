import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id:number

    @OneToMany(type => User,user => user.favorites)
    user:User

    @OneToOne(type => Product)
    product:Product
}
