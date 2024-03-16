import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateWay } from './message.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Message])],
  controllers: [MessageController],
  providers: [MessageService,MessageGateWay],
})
export class MessageModule {}
