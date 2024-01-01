import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartDetailService } from './cart-detail.service';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { CartDetail } from './entities/cart-detail.entity';

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

  @Get(':id')
  findOne(@Param('id') id: string):Promise<CartDetail> {
    return this.cartDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDetailDto: UpdateCartDetailDto):Promise<CartDetail> {
    return this.cartDetailService.update(+id, updateCartDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string):Promise<void> {
    return this.cartDetailService.remove(+id);
  }
}
