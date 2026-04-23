import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipts } from './receipts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipts])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}