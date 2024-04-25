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

  async create(createCartDetailDto: CreateCartDetailDto):Promise<any> {
   const cartCreate= await this.cartDetailRepository.save(createCartDetailDto);
   
    return this.cartDetailRepository.createQueryBuilder('cd')
    .select(['cd.quantity','cd.instruction','cd.user_id'])
    .leftJoinAndMapOne('cd.product', Product, 'p', 'p.id = cd.product_id')
    .where({
      user_id:cartCreate.user_id,
      product_id:cartCreate.product_id
    })
    .getOne()
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
    .createQueryBuilder('cd')
    .select(['cd.quantity','cd.instruction','cd.user_id'])
    .leftJoinAndMapOne('cd.product', Product, 'p', 'p.id = cd.product_id')
    .where({user_id:user_id})
    .getMany()

    const total= await this.cartDetailRepository
    .createQueryBuilder('cd')
    .leftJoinAndMapOne('cd.product', Product, 'p', 'p.id = cd.product_id')
    .select('SUM(cd.quantity * p.price)','total')
    .getRawOne()
    return {
      cart,
      total:total.total
    }
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
