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
import { User } from './user.model';
import { UserSetting } from '../userSetting/userSetting.model';
import { CreateUserInput } from './user.type';
import { UserService } from './user.service';
import { UserSettingService } from '../userSetting/userSetting.service';

export let incrementalId = 10;

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
  ) {}

  @Query((returns) => User, { nullable: true })
  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  getUsers() {
    return this.userService.getUsers();
  }

  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return this.userSettingService.getUserSettingById(user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }
}
