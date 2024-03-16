import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderTracking {
    @PrimaryColumn()
    order_id:number

    @PrimaryColumn()
    user_id:number

    @PrimaryColumn()
    status:number

    @CreateDateColumn()
    lastUpdateTime:Date

    
}
