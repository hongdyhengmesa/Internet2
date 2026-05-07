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
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USERNAME ?? process.env.USER ?? 'postgres',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE ?? 'ecommerce',
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
