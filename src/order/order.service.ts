import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Between, LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { CartDetail } from 'src/cart-detail/entities/cart-detail.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { OrderTracking } from 'src/order-tracking/entities/order-tracking.entity';
import { OrderTrackingModule } from 'src/order-tracking/order-tracking.module';
import { OrderTrackingService } from 'src/order-tracking/order-tracking.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(CartDetail)
    private readonly cartDetailRepository: Repository<CartDetail>,
    @Inject(OrderTrackingService)
    private readonly orderTrackingService: OrderTrackingService
  ) { }
  async create(createOrderDto: CreateOrderDto): Promise<Order | any> {

    try {
      //lấy danh sách cart      
      const cart = await this.cartDetailRepository.find(
        {
          where: { user_id: createOrderDto.user }
        })



      //tạo hóa đơn
      const order = await this.orderRepository.save(createOrderDto)
      //tạo hóa đơn chi tiết
      await this.orderDetailRepository
        .createQueryBuilder()
        .insert()
        .into(OrderDetail)
        .values(cart.map(cart => { return { order_id: order.id, ...cart } }))
        .execute()

      //tạo order tracking
      await this.orderTrackingService.create(
        {
          status: 0,
          user_id: order.user,
          order_id: order.id
        }
      )

      const {total}= await this.orderDetailRepository
      .createQueryBuilder('od')
      .select('SUM(od.quantity * p.price)','total')
      .leftJoin(Product, 'p', 'od.product_id = p.id')
      .where({
        order_id:order.id
      })
      .groupBy('od.order_id')
      .getRawOne()
      console.log(total);
      
        
      return {...order,total:total}
    } catch (error) {
      
      return 'Lỗi thêm order'+error
    }


  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find();
  }

  async findOne(id: number): Promise<any> {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: id },
        relations: {
          user: true
        }
      });

      const order_detail = await this.orderDetailRepository
        .createQueryBuilder('order_detail')
        .select(['order_detail.order_id', 'order_detail.quantity'])
        .leftJoinAndMapOne('order_detail.product', Product, 'p', 'p.id = order_detail.product_id')
        .where({ order_id: order.id })
        .getMany()


        //select tổng hóa đơn
        const {total}= await this.orderDetailRepository
        .createQueryBuilder('od')
        .select('SUM(od.quantity * p.price)','total')
        .leftJoin(Product, 'p', 'od.product_id = p.id')
        .where({
          order_id:id
        })
        .groupBy('od.order_id')
        .getRawOne()
      return { ...order, order_details: order_detail,total:total }

    } catch (error) {
      return "Không lấy được order"
    }
  }

  async findHistoryOrder(id_user: number): Promise<Order[]> {
    return await this.orderRepository.find({
      where:
      {
        user: id_user
      }
    }
    )
  }

  async findOrderByDate(dateStart: string, dateEnd: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: {
        order_date: Between(new Date(dateStart), new Date(dateEnd))
      }
    })
  }

  async remove(id: number): Promise<void> {
    await this.orderRepository.delete({ id: id })
  }
}
