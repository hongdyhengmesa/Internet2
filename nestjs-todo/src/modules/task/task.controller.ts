import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks') // best on route
export class TasksController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':id')
  getTask(@Param('id') id: string) { // param get value from url parameter
    console.log('[TasksController] GET /tasks/%s', id); // used for debug
    return this.taskService.getTask(id);
  }

  @Get()
  getAllTasks() {
    console.log('[TasksController] GET /tasks');
    return this.taskService.findAllTasks();
  }

  @Post()
  createTask(@Body() body: Partial<Task> & { userId?: number }) {
    console.log('[TasksController] POST /tasks', body);
    return this.taskService.createTask(body);
  }

  @Patch(':id/done') // Mark task as completed
  markTaskAsDone(
    @Body() body: Partial<Task> & { done?: boolean },
    @Param('id') id: string,
  ) {
    console.log('[TasksController] PATCH /tasks/%s/done', id, body);
    const patchBody: Partial<Task> = {
      ...body,
      completedAt: new Date(),
    };
    return this.taskService.updateTask(id, patchBody);
  }

  @Patch(':id/pending') // Task becomes not completed
  markTaskAsPending(
    @Body() body: Partial<Task> & { done?: boolean },
    @Param('id') id: string,
  ) {
    console.log('[TasksController] PATCH /tasks/%s/pending', id, body);
    const patchBody: Partial<Task> = {
      ...body, //copy properties all from body
      completedAt: null,
    };
    return this.taskService.updateTask(id, patchBody);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    console.log('[TasksController] DELETE /tasks/%s', id);
    return this.taskService.deleteTask(id);
  }
}