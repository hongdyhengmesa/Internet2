import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from '../../module/category/category.service';
import { ProductService } from '../../module/product/product.service';
import { CategoryType } from '../types/category.type';
import { CreateProductInput } from '../inputs/create-product.input';
import { ProductType } from '../types/product.type';

@Resolver(() => ProductType)
export class ProductCodeFirstResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query(() => [ProductType])
  products() {
    return this.productService.findAll();
  }

  @Query(() => [ProductType])
  productsByCategory(@Args('categoryId') categoryId: number) {
    return this.productService.findByCategory(Number(categoryId));
  }

  @Query(() => ProductType, { nullable: true })
  product(@Args('id') id: number) {
    return this.productService.findOne(Number(id));
  }

  @Mutation(() => ProductType)
  createProduct(@Args('input') input: CreateProductInput) {
    return this.productService.create({
      name: input.name,
      price: input.price,
      categoryId: Number(input.categoryId),
    });
  }

  @ResolveField(() => CategoryType, { nullable: true })
  category(@Parent() product: ProductType) {
    return this.categoryService.findOne(Number(product.categoryId));
  }
}