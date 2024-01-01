import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  create(@Body() createOrderDetailDto: CreateOrderDetailDto):Promise<OrderDetail> {
    return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  findAll():Promise<OrderDetail[]> {
    return this.orderDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<OrderDetail> {
    return this.orderDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDetailDto: UpdateOrderDetailDto):Promise<OrderDetail> {
    return this.orderDetailService.update(+id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<void> {
    return this.orderDetailService.remove(+id);
  }
}
