import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  createUser(body: Partial<User>) {
    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }

  getUser(username: string) {
    console.log(username);
    return this.usersRepo.findOne({
      where: { username },
      relations: ['tasks'],
    });
  }

  findAllUsers() {
    return this.usersRepo.find({ relations: ['tasks'] });
  }

  findOneUser(id: number) {
    return this.usersRepo.findOne({ where: { id }, relations: ['tasks'] });
  }
  async updateUser(body: Partial<User>) {
    if (!body.username) return null;
    await this.usersRepo.update({ username: body.username }, body);
    return this.getUser(body.username);
  }
  deleteUser(username: string) {
    console.log(username);
    return this.usersRepo.delete({ username });
  }
}