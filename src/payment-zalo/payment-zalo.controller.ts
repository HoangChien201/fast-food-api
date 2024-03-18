import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentZaloService } from './payment-zalo.service';
import { CreatePaymentZaloDto } from './dto/create-payment-zalo.dto';
import { UpdatePaymentZaloDto } from './dto/update-payment-zalo.dto';

@Controller('payment-zalo')
export class PaymentZaloController {
  constructor(private readonly paymentZaloService: PaymentZaloService) {}

  @Post('/create-order')
  create(@Body() createPaymentZaloDto: CreatePaymentZaloDto) {
    return this.paymentZaloService.createOrder(createPaymentZaloDto);
  }

}
