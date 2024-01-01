import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository:Repository<OrderDetail>
  ){}
  async create(createOrderDetailDto: CreateOrderDetailDto):Promise<OrderDetail> {
    return await this.orderDetailRepository.save(createOrderDetailDto)
  }

  async findAll():Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find();
  }

  async findOne(id: number):Promise<OrderDetail> {
    return await this.orderDetailRepository.findOneBy({id:id});
  }

  async update(id: number, updateOrderDetailDto: UpdateOrderDetailDto):Promise<OrderDetail> {
    const orderDetail=await this.orderDetailRepository.findOneBy({id:id});
    return this.orderDetailRepository.save({
      ...orderDetail,
      ...updateOrderDetailDto
    })
  }

  async remove(id: number):Promise<void> {
    await this.orderDetailRepository.delete(id);
  }
}
