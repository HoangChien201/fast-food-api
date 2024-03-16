import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CartDetail {
    @PrimaryColumn()
    product_id:number

    @PrimaryColumn()
    user_id:number

    @Column()
    instruction:string

    @Column()
    quantity:number
}
