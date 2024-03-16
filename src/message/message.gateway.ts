import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Message } from "./entities/message.entity";
import { MessageService } from "./message.service";
import { Notification } from "./entities/notification.entity";

@WebSocketGateway({cors:true})
export class MessageGateWay {
    constructor(private readonly messageService: MessageService) {}
    @WebSocketServer()
    sever;

    @SubscribeMessage('message')
    async handleEvent(@MessageBody() data: Message): Promise<void> {
        await this.messageService.create({...data,status:1})
        this.sever.emit(`message-${data.user_id_receice}`,data)
    }

    @SubscribeMessage('notification')
    async notificationHandle(@MessageBody() data: Notification): Promise<void> {
        console.log('notification',data);
        
        this.sever.emit(`notification-${data.to}`,data)
    }
}