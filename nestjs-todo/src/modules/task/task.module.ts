import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UserModule],
  controllers: [TasksController],
  providers: [TaskService],
  exports: [],
  // Add any other necessary configurations or modules
})
export class TaskModule {}