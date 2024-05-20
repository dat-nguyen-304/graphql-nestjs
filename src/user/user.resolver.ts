import { Inject, UseGuards } from '@nestjs/common';
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
import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './user.type';
import { UserService } from './user.service';
import { UserSettingService } from '../userSetting/userSetting.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.model';
import { GqlAuthGuard } from 'src/jwt-auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/auth.decorator';

export let incrementalId = 10;

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private userSettingService: UserSettingService,
    private productService: ProductService,
  ) {}

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async getUsers(@CurrentUser() user: User) {
    console.log({ user });
    return this.userService.getUsers();
  }

  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUserSettings(@Parent() user: User) {
    return this.userSettingService.getUserSettingById(user.id);
  }

  @ResolveField((returns) => [Product], { name: 'products', defaultValue: [] })
  getProducts(@Parent() user: User) {
    return this.productService.getProductsByUserId(user.id);
  }

  @Mutation((returns) => User)
  createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData);
  }

  @Mutation((returns) => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput) {
    return this.userService.updateUser(updateUserData);
  }

  @Mutation((returns) => String)
  async deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput) {
    const res = await this.userService.deleteUser(deleteUserData);
    return `Deleted ${res} records`;
  }
}
