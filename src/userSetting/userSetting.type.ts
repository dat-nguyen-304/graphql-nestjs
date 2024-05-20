import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class createUserSettingInput {
  @Field((type) => Int)
  userId: number;

  @Field({ nullable: true, defaultValue: false })
  receiveNotifications: boolean;

  @Field({ nullable: true, defaultValue: false })
  receiveEmails: boolean;
}
