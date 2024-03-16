import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Favorite {
    @PrimaryColumn()
    product_id:number

    @PrimaryColumn()
    user_id:number


}
