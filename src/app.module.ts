import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { GraphqlModule } from './graphql/graphql.module';
import { Category } from './module/category/category.entity';
import { Product } from './module/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'ecommerce',
      entities: [Category, Product],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],

      playground: true,
    }),

    GraphqlModule,
  ],
})
export class AppModule {}
