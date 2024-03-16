import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CartDetail } from 'src/cart-detail/entities/cart-detail.entity';
import { OrderDetail } from 'src/order-detail/entities/order-detail.entity';
import { OrderDetailModule } from 'src/order-detail/order-detail.module';
import { OrderDetailService } from 'src/order-detail/order-detail.service';
import { CartDetailModule } from 'src/cart-detail/cart-detail.module';
import { OrderTrackingModule } from 'src/order-tracking/order-tracking.module';
import { OrderTrackingService } from 'src/order-tracking/order-tracking.service';

@Module({
  imports:[TypeOrmModule.forFeature([Order]),OrderDetailModule,CartDetailModule,OrderTrackingModule],
  controllers: [OrderController],
  providers: [OrderService,OrderDetailService,],
})
export class OrderModule {}
