import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository:Repository<OrderDetail>
  ){}
  async create(createOrderDetailDto: Array<CreateOrderDetailDto>):Promise<string> {
    await this.orderDetailRepository.createQueryBuilder()
    .insert()
    .into(OrderDetail)
    .values(createOrderDetailDto)
    .execute()
    return 'order-detail'
  }

  async findAll():Promise<OrderDetail[]> {
    return await this.orderDetailRepository.find()
  }

  async findOne(product_id: number,order_id: number):Promise<OrderDetail> {
    const result=await this.orderDetailRepository
    .createQueryBuilder('order_detail')
    .select(['order_detail.order_id','order_detail.quantity'])
    .leftJoinAndMapOne('order_detail.product', Product, 'p', 'p.id = order_detail.product_id')
    .where({
      product_id:product_id,
      order_id:order_id
    })
    .getOne()
    return result;
  }

  async findByOrder(order_id: number):Promise<OrderDetail[]> {
    const result=await this.orderDetailRepository
    .createQueryBuilder('order_detail')
    .select(['order_detail.order_id','order_detail.quantity'])
    .leftJoinAndMapOne('order_detail.product', Product, 'p', 'p.id = order_detail.product_id')
    .where({order_id:order_id})
    .getMany()
    return result
  }

  async update(product_id: number,order_id: number, updateOrderDetailDto: UpdateOrderDetailDto):Promise<OrderDetail> {
    const orderDetail=await this.orderDetailRepository.findOne({where:{
      product_id:product_id,
      order_id:order_id
    }});
    return await this.orderDetailRepository.save({
      ...orderDetail,
      ...updateOrderDetailDto
    });
  }

  async remove(id: number):Promise<void> {
    await this.orderDetailRepository.delete(id);
  }
}
