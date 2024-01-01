import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Between, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>
  ) { }
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderRepository.save(createOrderDto);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepository.findOneBy({ id: id });
  }

  async findHistoryOrder(id_user: number): Promise<Order[]> {
    const user = await this.orderRepository.findOneBy({ id: id_user })
    return await this.orderRepository.find({
      where:
      {
        user: user
      }
    }
    )
  }

  async findOrderByDate(dateStart:string,dateEnd:string):Promise<Order[]>{
    return await this.orderRepository.find({
      where:{
        order_date:Between(new Date(dateStart),new Date(dateEnd))
      }
    })
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepository.findOneBy({ id: id })
    return await this.orderRepository.save({
      ...order,
      ...updateOrderDto
    });
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete({ id: id })
  }
}
