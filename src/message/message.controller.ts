import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(createMessageDto:CreateMessageDto):Promise<Message> {
    return this.messageService.create(createMessageDto);
  }

  @Get('/get-message-by-user-nearest/:id')
  getMessageByUserNearest(@Param('id') user_id_receice:number):Promise<Message[]>{
    return this.messageService.findMessageByUserNearest(user_id_receice);
  }

  @Get('/get-message-by-room?')
  getMessageByRoom(@Query('user_id_receice') user_id_receice:number,@Query('user_id_send') user_id_send:number):Promise<Message[]>{
    return this.messageService.findMessagesByRoom(user_id_receice,user_id_send);
  }

  @Post('/update/:id')
  update(@Param('id') id:number,@Body() updateMessageDto:UpdateMessageDto){
    return this.messageService.update(id,updateMessageDto)
  }
}
