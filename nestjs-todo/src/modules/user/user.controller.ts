import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(':username')
  getUser(@Param('username') username: string) {
    console.log('[UsersController] GET /users/%s', username);
    return this.userService.getUser(username);
  }

  @Get()
  getAllUsers() {
    console.log('[UsersController] GET /users');
    return this.userService.findAllUsers();
  }

  @Post()
  createUser(@Body() body: createUserDto) {
    console.log('[UsersController] POST /users', body);
    return this.userService.createUser(body);
  }

  @Patch(':username')
  updateUser(
    @Body() body: { username: string; email: string; password: string },
  ) {
    console.log('[UsersController] PATCH /users/%s', body.username, body);
    return this.userService.updateUser(body);
  }

  @Delete(':username')
  deleteUser(@Param('username') username: string) {
    console.log('[UsersController] DELETE /users/%s', username);
    return this.userService.deleteUser(username);
  }
}