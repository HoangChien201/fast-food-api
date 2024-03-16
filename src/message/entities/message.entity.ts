import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id:number

    @PrimaryColumn()
    user_id_send: number;

    @PrimaryColumn()
    user_id_receice: number;

    @Column()
    message: string;

    @Column()
    status: number;

    @CreateDateColumn()
    create_at:Date
}
