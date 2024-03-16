import { Module } from '@nestjs/common';
import { PaymentMomoService } from './payment-momo.service';
import { PaymentMomoController } from './payment-momo.controller';

@Module({
  controllers: [PaymentMomoController],
  providers: [PaymentMomoService],
})
export class PaymentMomoModule {}
