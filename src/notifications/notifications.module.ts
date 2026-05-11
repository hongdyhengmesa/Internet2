import { forwardRef, Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CoreModule } from '../core/core.module';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports:[ forwardRef(()=>OrdersModule),CoreModule],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}