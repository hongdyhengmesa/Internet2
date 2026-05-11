import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipts } from './receipts.entity';
import { ReceiptsService } from './receipts.services';
import { ReceiptsController } from './receipts.controller';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Receipts]),
    NotificationsModule, 
  ],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}