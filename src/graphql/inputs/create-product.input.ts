import { Field, Float, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name!: string;

  @Field(() => Float)
  @IsNumber()
  @IsPositive()
  price!: number;

  @Field(() => ID)
  @IsNumber()
  categoryId!: number;
}