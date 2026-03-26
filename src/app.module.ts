import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipts } from './receipts/receipts.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'receipts_db',
      synchronize: true,
      entities: [Receipts], // register entity
    }),
    ReceiptsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
