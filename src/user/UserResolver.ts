import { Inject } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { userSettings } from 'src/__mock__/MockUserSettings';
import { users } from 'src/__mock__/MockUsers';
import { User } from 'src/graphql/models/User';
import { UserSetting } from 'src/graphql/models/UserSetting';
import { CreateUserInput } from 'src/graphql/utils/CreateUserInput';
import { UserService } from './UserService';

export let incrementalId = 10;

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return users.find((user) => user.id === id);
  }

  @Query(() => [User])
  getUsers() {
    return users;
  }

  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    console.log(user);
    return userSettings.find((setting) => setting.userId === user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    const { username, displayName } = createUserData;
    const newUser = { username, displayName, id: ++incrementalId };
    users.push(newUser);
    return newUser;
  }
}
