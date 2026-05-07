import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

type CreateCategoryInput = {
  name: string;
};

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }

    return category;
  }

  create(input: CreateCategoryInput) {
    const category = this.categoryRepository.create({
      name: input.name.trim(),
    });

    return this.categoryRepository.save(category);
  }
}