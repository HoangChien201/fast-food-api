import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100})
    name:string

    @Column()
    image:string

    @OneToMany(type => Product,product => product.category)
    products:Product[]
}
