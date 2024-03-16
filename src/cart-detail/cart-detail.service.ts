import { Injectable } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetail } from './entities/cart-detail.entity';
import { Repository  } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { CartDetailGetByUserRespone } from './dto/cart-detail-get-by-user-respone.dto';

@Injectable()
export class CartDetailService {
  constructor(
    @InjectRepository(CartDetail)
    private readonly cartDetailRepository:Repository<CartDetail>
  ){}

  async create(createCartDetailDto: CreateCartDetailDto):Promise<CartDetail> {
    return await this.cartDetailRepository.save(createCartDetailDto);
  }

  async findAll():Promise<CartDetail[]> {
    return await this.cartDetailRepository.find();
  }

  async findOne(product_id: number,user_id: number):Promise<CartDetail> {
    return await this.cartDetailRepository.findOne({where:{
      product_id:product_id,
      user_id:user_id
    }});
  }

  async findByUser(user_id: number):Promise<CartDetailGetByUserRespone> {
    const cart=await this.cartDetailRepository
    .createQueryBuilder('cart_detail')
    .select('cart_detail.user_id','user_id')
    .leftJoinAndMapOne('cart_detail.product', Product, 'p', 'p.id = cart_detail.product_id')
    .addSelect('cart_detail.quantity','quantity')
    .addSelect('cart_detail.instruction','instruction')
    .addSelect('cart_detail.quantity * p.price','total')
    .where({user_id:user_id})
    .getRawMany()
    const cart_total=cart.reduce((prevValue,currentValue)=>{
      return parseInt(prevValue) + parseInt(currentValue.total)
    },0)
    return {cart:cart,total:cart_total}
  }

  async clearCart(user_id:number):Promise<string>{
    try {
      await this.cartDetailRepository.delete({user_id:user_id})
      return 'Clear cart successs'
    } catch (error) {
      return 'Clear cart error'
      
    }
  }

  async update(product_id: number,user_id: number, updateCartDetailDto: UpdateCartDetailDto):Promise<CartDetail> {
    const cartDetail=await this.cartDetailRepository.findOne({where:{
      product_id:product_id,
      user_id:user_id
    }});
    return await this.cartDetailRepository.save({
      ...cartDetail,
      ...updateCartDetailDto
    });
  }

  async remove(product_id: number,user_id:number):Promise<void> {
    await this.cartDetailRepository.delete({
      product_id:product_id,
      user_id:user_id
    })
  }
}
