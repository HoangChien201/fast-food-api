import { Module } from '@nestjs/common';
import { OrderTrackingService } from './order-tracking.service';
import { OrderTrackingController } from './order-tracking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTracking } from './entities/order-tracking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([OrderTracking])],
  controllers: [OrderTrackingController],
  providers: [OrderTrackingService],
  exports:[TypeOrmModule,OrderTrackingService]
})
export class OrderTrackingModule {}
