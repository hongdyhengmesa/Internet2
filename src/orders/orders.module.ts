import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { NotificationsModule } from '../notifications/notifications.module';
@Module({
  imports: [TypeOrmModule.forFeature([Order]),
  forwardRef(() => NotificationsModule)],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}