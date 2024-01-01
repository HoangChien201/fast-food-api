import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto):Promise<Order> {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll():Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Get('/find-one/:id')
  findOne(@Param('id') id: string):Promise<Order> {
    return this.orderService.findOne(+id);
  }

  @Get('/history-order/:id')
  findHistoryOrder(@Param('id') idUser: string):Promise<Order[]> {
    return this.orderService.findHistoryOrder(+idUser);
  }

  @Get('/order-by-date?')
  findOrderByDate(@Query('date-start') dateStart: string,@Query('date-end') dateEnd: string):Promise<Order[]> {
    return this.orderService.findOrderByDate(dateStart,dateEnd);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto):Promise<Order> {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<void> {
    return this.orderService.remove(+id);
  }
}
