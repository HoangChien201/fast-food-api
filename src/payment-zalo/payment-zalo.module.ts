import { Module } from '@nestjs/common';
import { PaymentZaloService } from './payment-zalo.service';
import { PaymentZaloController } from './payment-zalo.controller';

@Module({
  controllers: [PaymentZaloController],
  providers: [PaymentZaloService],
})
export class PaymentZaloModule {}
