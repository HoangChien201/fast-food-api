import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderTrackingService } from './order-tracking.service';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
import { UpdateOrderTrackingDto } from './dto/update-order-tracking.dto';
import { OrderTracking } from './entities/order-tracking.entity';

@Controller('order-tracking')
export class OrderTrackingController {
  constructor(private readonly orderTrackingService: OrderTrackingService) {}

  @Post()
  create(@Body() createOrderTrackingDto: CreateOrderTrackingDto):Promise<OrderTracking> {
    return this.orderTrackingService.create(createOrderTrackingDto);
  }

  @Get('get-one-order-tracking?')
  getOneOrderTracking(@Query('order_id') order_id: number,@Query('user_id') user_id: number):Promise<OrderTracking> {
    return this.orderTrackingService.getOneOrderTrack(+order_id,+user_id);
  }

  @Get('check-order?')
  checkOrder(@Query('order_id') order_id: number):Promise<OrderTracking> {
    return this.orderTrackingService.checkOrder(+order_id);
  }

  @Get('get-order-unconfirm')
  getOrderUnConfirm():Promise<OrderTracking[]> {
    return this.orderTrackingService.getOrderUnConfirm();
  }

  @Get('get-order-confirmed')
  getOrderConfirmed():Promise<OrderTracking[]> {
    return this.orderTrackingService.getOrderConfirmed();
  }

  @Get('get-order-delivering')
  getOrderDelivering():Promise<OrderTracking[]> {
    return this.orderTrackingService.getOrderDelivering();
  }

  @Get('get-order-done')
  getOrderDone():Promise<OrderTracking[]> {
    return this.orderTrackingService.getOrderDone();
  }

  @Get('get-order-cancle')
  getOrderCancle():Promise<OrderTracking[]> {
    return this.orderTrackingService.getOrderCancle();
  }

}
