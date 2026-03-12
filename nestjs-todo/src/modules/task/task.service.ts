import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>, // Used for inject task Repository
    @InjectRepository(User)
    private usersRepo: Repository<User>, // Used for inject user repopistory
  ) {}

  getTask(id: string) {
    console.log(id);
    return this.tasksRepo.findOne({
      where: { id: Number(id) },
      relations: ['user'],
    });
  }

  // Create entity object
  async createTask(body: Partial<Task> & { userId?: number }) {
    const task = this.tasksRepo.create(body as Partial<Task>);
    if (body.userId) {
      const user = await this.usersRepo.findOne({ where: { id: body.userId } });
      if (user) task.user = user;
    }
    return this.tasksRepo.save(task);
  }

  async updateTask(id: string, body: Partial<Task>) {
    await this.tasksRepo.update(Number(id), body);
    return this.getTask(id);
  }
  
  deleteTask(id: string) {
    console.log(id);
    return this.tasksRepo.delete(Number(id));
  }

  findAllTasks() {
    return this.tasksRepo.find({ relations: ['user'] });
  }
}