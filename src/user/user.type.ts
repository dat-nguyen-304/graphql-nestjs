import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;
}

@InputType()
export class UpdateUserInput {
  @Field((type) => Int)
  userId: number;

  @Field()
  username: string;

  @Field({ nullable: true })
  displayName: string;
}

@InputType()
export class DeleteUserInput {
  @Field((type) => Int)
  id: number;
}
