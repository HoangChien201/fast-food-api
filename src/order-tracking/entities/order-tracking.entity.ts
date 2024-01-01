import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderTracking {
    @PrimaryGeneratedColumn()
    id:number

    @PrimaryColumn()
    user_id:number

    @Column()
    status:string

    @Column()
    lastUpdateTime:Date

    
}
