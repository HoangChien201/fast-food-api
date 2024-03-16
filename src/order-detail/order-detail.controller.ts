import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';

@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  @Post()
  create(@Body() createOrderDetailDto: Array<CreateOrderDetailDto>):Promise<string> {
    return this.orderDetailService.create(createOrderDetailDto);
  }

  @Get()
  findAll():Promise<OrderDetail[]> {
    return this.orderDetailService.findAll();
  }

  @Get('/get-by-order/:id')
  findByOrder(@Param('id') id:number):Promise<OrderDetail[]> {
    return this.orderDetailService.findByOrder(id);
  }

  //----/get?product=1&user=2
  @Get('/get?')
  findOne(@Query('product') product_id: number,@Query('order') order_id: number):Promise<OrderDetail> {
    return this.orderDetailService.findOne(product_id,order_id);
  }

  //----/update?product=1&user=2
  @Patch('/update?')
  update(@Query('product') product_id: number,@Query('order') order_id: number, @Body() updateOrderDetailDto: UpdateOrderDetailDto):Promise<OrderDetail> {
    return this.orderDetailService.update(+product_id,order_id, updateOrderDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<void> {
    return this.orderDetailService.remove(+id);
  }
}
