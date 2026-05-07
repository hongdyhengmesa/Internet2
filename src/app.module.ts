import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      typePaths: [join(process.cwd(), 'src/graphql/schema/*.graphql')],

      playground: true,
    }),

    GraphqlModule,
  ],
})
export class AppModule {}