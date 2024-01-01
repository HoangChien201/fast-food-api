import { Injectable } from '@nestjs/common';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
import { UpdateOrderTrackingDto } from './dto/update-order-tracking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTracking } from './entities/order-tracking.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderTrackingService {
  constructor(
    @InjectRepository(OrderTracking)
    private readonly orderTrackingRepository:Repository<OrderTracking>
  ){}


  async create(createOrderTrackingDto: CreateOrderTrackingDto):Promise<OrderTracking> {
    return await this.orderTrackingRepository.save(createOrderTrackingDto);
  }

  async findAll():Promise<OrderTracking[]> {
    return await this.orderTrackingRepository.find();
  }

  async findOne(id: number):Promise<OrderTracking> {
    return await this.orderTrackingRepository.findOneBy({id:id});
  }

  async update(id: number, updateOrderTrackingDto: UpdateOrderTrackingDto):Promise<OrderTracking | null> {
    const orderTracking=await this.orderTrackingRepository.findOneBy({id:id});
    return await this.orderTrackingRepository.save({
      ...orderTracking,
      ...updateOrderTrackingDto
    })
  }

  async remove(id: number):Promise<void> {
    await this.orderTrackingRepository.delete(id)
  }
}
