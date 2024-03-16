import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentMomoService } from './payment-momo.service';
import { PaymentRequest } from './entities/payment-momo.entity';

@Controller('payment-momo')
export class PaymentMomoController {
  constructor(private readonly paymentMomoService: PaymentMomoService) {}

  @Post()
  paymentHandle(@Body() paymentRequest: PaymentRequest) {
    return this.paymentMomoService.paymentHandle(paymentRequest);
  }
}
