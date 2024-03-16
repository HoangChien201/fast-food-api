import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Server } from 'socket.io';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>
  ) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    return await this.messageRepository.save(createMessageDto);
  }

  async findMessageByUserNearest(user_id_reveice: number): Promise<Message[]> {
    const result = await this.messageRepository.createQueryBuilder('message')
      .select([
        'message.message_id',
        'message.message',
        'message.status',
        'message.create_at'// Add other user properties as needed
        // Add other message properties as needed
      ])
      .leftJoinAndMapOne('message.user', User, 'user', 'user.id = message.user_id_send')
      .where(`message.create_at IN 
    (SELECT MAX(create_at) as create_at FROM message
    WHERE user_id_receice = ${user_id_reveice} GROUP BY user_id_send)`)
    .orderBy({
      create_at:'DESC'
    })
      .getMany();
    return result
  }

  async findMessagesByRoom(user_id_receice: number,user_id_send:number): Promise<Message[]> {
    const result = await this.messageRepository.createQueryBuilder('message')
      .select([
        'message.message_id',
        'message.message',
        'message.status',
        'message.create_at'// Add other user properties as needed
        // Add other message properties as needed
      ])
      .leftJoinAndMapOne('message.user_send', User, 'user_send', 'user_send.id = message.user_id_send')
      .where({
        user_id_receice:user_id_receice || user_id_send,
        user_id_send:user_id_send || user_id_receice,
      })
      .orWhere({
        user_id_receice: user_id_send,
        user_id_send:user_id_receice,
      })
      .getMany();
    return result
  }

  async update(id:number,updateMessageDto:UpdateMessageDto):Promise<string> {
    try {
      const message=await this.messageRepository.findOne({
        where:{
          message_id:id
        }
      })
  
      await this.messageRepository.save(
        {
          ...message,
          ...updateMessageDto
        }
      )
      return 'update success'
    } catch (error) {
      throw error
    }
    
  }
}


