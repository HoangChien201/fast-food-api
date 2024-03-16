import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { CartDetail } from './entities/cart-detail.entity';
import { CartDetailGetByUserRespone } from './dto/cart-detail-get-by-user-respone.dto';

@Controller('cart-detail')
export class CartDetailController {
  constructor(private readonly cartDetailService: CartDetailService) {}

  @Post()
  create(@Body() createCartDetailDto: CreateCartDetailDto):Promise<CartDetail> {
    return this.cartDetailService.create(createCartDetailDto);
  }

  @Get()
  findAll():Promise<CartDetail[]> {
    return this.cartDetailService.findAll();
  }

  @Get('/get-by-user/:id')
  findByUser(@Param('id') id:number):Promise<CartDetailGetByUserRespone> {
    return this.cartDetailService.findByUser(id);
  }

  //clear cart
  @Get('/clear-cart/:id')
  clearCart(@Param('id') id:number):Promise<string> {
    return this.cartDetailService.clearCart(id);
  }

  //----/get?product=1&user=2
  @Get('/get?')
  findOne(@Query('product') product_id: number,@Query('user') user_id: number):Promise<CartDetail> {
    return this.cartDetailService.findOne(product_id,user_id);
  }

  //----/update?product=1&user=2
  @Patch('/update?')
  update(@Query('product') product_id: number,@Query('user') user_id: number, @Body() updateCartDetailDto: UpdateCartDetailDto):Promise<CartDetail> {
    return this.cartDetailService.update(+product_id,user_id, updateCartDetailDto);
  }

  @Delete('/delete?')
  remove(@Query('product') product_id: number,@Query('user') user_id: number):Promise<void> {
    return this.cartDetailService.remove(+product_id,user_id);
  }
}
