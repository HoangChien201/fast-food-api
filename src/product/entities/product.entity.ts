import { Category } from "src/category/entities/category.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(type=>Category,category=>category.products)
    category: Category;

    @Column()
    name:string

    @Column()
    price:number

    @Column()
    image:string

    @Column()
    description:string

    @Column()
    quantity:number

}
