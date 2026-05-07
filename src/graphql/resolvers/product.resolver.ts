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

@Resolver('Product')
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
  ) {}

  @Query('products')
  products() {
    return this.productService.findAll();
  }

  @Query('productsByCategory')
  productsByCategory(@Args('categoryId') categoryId: string) {
    return this.productService.findByCategory(Number(categoryId));
  }

  @Query('product')
  product(@Args('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Mutation('createProduct')
  createProduct(
    @Args('name') name: string,
    @Args('price') price: number,
    @Args('categoryId') categoryId: string,
  ) {
    return this.productService.create({
      name,
      price,
      categoryId: Number(categoryId),
    });
  }

  @ResolveField('category')
  category(@Parent() product: { categoryId: number }) {
    return this.categoryService.findOne(Number(product.categoryId));
  }
}