import { Injectable } from '@nestjs/common';
import { CreateCartDetailDto } from './dto/create-cart-detail.dto';
import { UpdateCartDetailDto } from './dto/update-cart-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CartDetail } from './entities/cart-detail.entity';
import { Repository } from 'typeorm';

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

  async findOne(id: number):Promise<CartDetail> {
    return await this.cartDetailRepository.findOneBy({id:id});
  }

  async update(id: number, updateCartDetailDto: UpdateCartDetailDto):Promise<CartDetail> {
    const cartDetail=await this.cartDetailRepository.findOneBy({id:id})
    return await this.cartDetailRepository.save({
      ...cartDetail,
      ...updateCartDetailDto
    });
  }

  async remove(id: number):Promise<void> {
    await this.cartDetailRepository.delete(id)
  }
}
