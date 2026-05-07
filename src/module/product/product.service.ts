import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Product } from './product.entity';

type CreateProductInput = {
  name: string;
  price: number;
  categoryId: number;
};

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService,
  ) {}

  findAll() {
    return this.productRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    return product;
  }

  async findByCategory(categoryId: number) {
    return this.productRepository.find({
      where: { categoryId },
      order: { id: 'ASC' },
    });
  }

  async create(input: CreateProductInput) {
    await this.categoryService.findOne(input.categoryId);

    const product = this.productRepository.create({
      name: input.name.trim(),
      price: input.price,
      categoryId: input.categoryId,
    });

    return this.productRepository.save(product);
  }
}