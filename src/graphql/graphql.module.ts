import { Module } from '@nestjs/common';
import { CategoryModule } from '../module/category/category.module';
import { ProductModule } from '../module/product/product.module';
import { CategoryResolver } from './resolvers/category.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { CategoryCodeFirstResolver } from './resolvers/category.code-first.resolver';
import { ProductCodeFirstResolver } from './resolvers/product.code-first.resolver';

const useCodeFirst = process.env.GRAPHQL_STYLE === 'code-first';

@Module({
  imports: [CategoryModule, ProductModule],
  providers: useCodeFirst
    ? [CategoryCodeFirstResolver, ProductCodeFirstResolver]
    : [CategoryResolver, ProductResolver],
})
export class GraphqlModule {}