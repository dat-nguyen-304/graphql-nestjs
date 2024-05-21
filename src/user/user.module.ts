import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserSetting } from '../userSetting/userSetting.model';
import { UserSettingService } from '../userSetting/userSetting.service';
import { UserSettingResolver } from '../userSetting/userSetting.resolver';
import { Product } from '../product/product.model';
import { ProductService } from '../product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting, Product])],
  providers: [
    UserResolver,
    UserSettingResolver,
    UserService,
    UserSettingService,
    ProductService,
  ],
  exports: [UserService],
})
export class UserModule {}
