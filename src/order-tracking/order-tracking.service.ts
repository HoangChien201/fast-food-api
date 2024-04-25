import { Injectable } from '@nestjs/common';
import { CreateOrderTrackingDto } from './dto/create-order-tracking.dto';
import { UpdateOrderTrackingDto } from './dto/update-order-tracking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTracking } from './entities/order-tracking.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class OrderTrackingService {
  constructor(
    @InjectRepository(OrderTracking)
    private readonly orderTrackingRepository:Repository<OrderTracking>
  ){}


  async create(createOrderTrackingDto: CreateOrderTrackingDto):Promise<OrderTracking> {
    return await this.orderTrackingRepository.save(createOrderTrackingDto);
  }

  async checkOrder(order_id: number):Promise<OrderTracking> {
    return await this.orderTrackingRepository
    .createQueryBuilder()
    .where({
      order_id:order_id
    })
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .getOne();
  }

  async getOneOrderTrack(order_id: number):Promise<OrderTracking> {
    return await this.orderTrackingRepository
    .createQueryBuilder('ot')
    .select(['ot.status','ot.lastUpdateTime'])
    .leftJoinAndMapOne('ot.order',Order,'order','order.id=ot.order_id')
    .leftJoinAndMapOne('ot.user',User,'u','u.id=ot.user_id')
    .where({
      order_id:order_id,
    })
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .limit(1)
    .getOne();
  }

  async getOrderUnConfirm():Promise<OrderTracking[]> {
    return await this.orderTrackingRepository
    .createQueryBuilder('ot')
    .select(['ot.status','ot.lastUpdateTime'])
    .leftJoinAndMapOne('ot.order',Order,'order','order.id=ot.order_id')
    .leftJoinAndMapOne('ot.user',User,'u','u.id=ot.user_id')

    .where(`order_id in 
    (SELECT order_id FROM defaultdb.order_tracking GROUP BY order_id HAVING MAX(lastUpdateTime)) 
    AND lastUpdateTime IN 
    (SELECT MAX(lastUpdateTime) AS lastUpdateTime FROM defaultdb.order_tracking GROUP BY order_id )`)
    .andWhere({status:0})
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .getMany();
  }

  async getOrderConfirmed():Promise<OrderTracking[]> {
    return await this.orderTrackingRepository
    .createQueryBuilder('ot')
    .select(['ot.status','ot.lastUpdateTime'])
    .leftJoinAndMapOne('ot.order',Order,'order','order.id=ot.order_id')
    .leftJoinAndMapOne('ot.user',User,'u','u.id=ot.user_id')
    .where(`order_id in 
    (SELECT order_id FROM defaultdb.order_tracking GROUP BY order_id HAVING MAX(lastUpdateTime)) 
    AND lastUpdateTime IN 
    (SELECT MAX(lastUpdateTime) AS lastUpdateTime FROM defaultdb.order_tracking GROUP BY order_id )`)
    .andWhere({status:1})
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .getMany();
  }

  async getOrderWaitDelivering():Promise<OrderTracking[]> {
    return await this.orderTrackingRepository
    .createQueryBuilder('ot')
    .select(['ot.status','ot.lastUpdateTime'])
    .leftJoinAndMapOne('ot.order',Order,'order','order.id=ot.order_id')
    .leftJoinAndMapOne('ot.user',User,'u','u.id=ot.user_id')
    .where(`order_id in 
    (SELECT order_id FROM defaultdb.order_tracking GROUP BY order_id HAVING MAX(lastUpdateTime)) 
    AND lastUpdateTime IN 
    (SELECT MAX(lastUpdateTime) AS lastUpdateTime FROM defaultdb.order_tracking GROUP BY order_id )`)
    .andWhere({
      status:2
    })
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .getMany();
  }

  async getOrderDelivering():Promise<OrderTracking[]> {
    return await this.orderTrackingRepository
    .createQueryBuilder('ot')
    .select(['ot.status','ot.lastUpdateTime'])
    .leftJoinAndMapOne('ot.order',Order,'order','order.id=ot.order_id')
    .leftJoinAndMapOne('ot.user',User,'u','u.id=ot.user_id')
    .where(`order_id in 
    (SELECT order_id FROM defaultdb.order_tracking GROUP BY order_id HAVING MAX(lastUpdateTime)) 
    AND lastUpdateTime IN 
    (SELECT MAX(lastUpdateTime) AS lastUpdateTime FROM defaultdb.order_tracking GROUP BY order_id )`)
    .andWhere({
      status:3
    })
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .getMany();
  }

  async getOrderDone():Promise<OrderTracking[]> {
    return await this.orderTrackingRepository
    .createQueryBuilder('ot')
    .select(['ot.status','ot.lastUpdateTime'])
    .leftJoinAndMapOne('ot.order',Order,'order','order.id=ot.order_id')
    .leftJoinAndMapOne('ot.user',User,'u','u.id=ot.user_id')
    .where(`order_id in 
    (SELECT order_id FROM defaultdb.order_tracking GROUP BY order_id HAVING MAX(lastUpdateTime)) 
    AND lastUpdateTime IN 
    (SELECT MAX(lastUpdateTime) AS lastUpdateTime FROM defaultdb.order_tracking GROUP BY order_id )`)
    .andWhere({
      status:4
    })
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .getMany();
  }

  async getOrderCancle():Promise<OrderTracking[]> {
    return await this.orderTrackingRepository
    .createQueryBuilder('ot')
    .select(['ot.status','ot.lastUpdateTime'])
    .leftJoinAndMapOne('ot.order',Order,'order','order.id=ot.order_id')
    .leftJoinAndMapOne('ot.user',User,'u','u.id=ot.user_id')
    .where(`order_id in 
    (SELECT order_id FROM defaultdb.order_tracking GROUP BY order_id HAVING MAX(lastUpdateTime)) 
    AND lastUpdateTime IN 
    (SELECT MAX(lastUpdateTime) AS lastUpdateTime FROM defaultdb.order_tracking GROUP BY order_id )`)
    .andWhere({
      status:5
    })
    .orderBy({
      lastUpdateTime:'DESC'
    })
    .getMany();
  }

}
