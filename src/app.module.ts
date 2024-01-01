import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UpdateFileModule } from './update-flie/update-file.module';
import { AuthForgetPasswordhModule } from './forget-password/authForgetPassword.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { DataSource } from 'typeorm';
import { OrderTrackingModule } from './order-tracking/order-tracking.module';
import { CartDetailModule } from './cart-detail/cart-detail.module';
import { FavoriteModule } from './favorite/favorite.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { Favorite } from './favorite/entities/favorite.entity';
import { OrderDetail } from './order-detail/entities/order-detail.entity';
import { Order } from './order/entities/order.entity';
import { CartDetail } from './cart-detail/entities/cart-detail.entity';
import { OrderTracking } from './order-tracking/entities/order-tracking.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DBNAME,
      entities: [User,Product,Category,Favorite,OrderDetail,Order,CartDetail,OrderTracking],
      synchronize: true,
    }),
    UserModule,
    ProductModule,
    CartDetailModule,
    CategoryModule,
    OrderDetailModule,
    FavoriteModule,
    OrderTrackingModule,
    OrderModule
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
