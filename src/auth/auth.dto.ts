import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;
}

@InputType()
export class LoginInput {
  @Field()
  username: string;
}
