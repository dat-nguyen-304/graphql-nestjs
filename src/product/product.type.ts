import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field((type) => Float)
  price: number;

  @Field((type) => Int)
  userId: number;
}
