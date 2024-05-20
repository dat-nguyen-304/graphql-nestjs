import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';
import { UserSetting } from '../userSetting/userSetting.model';
import { UserSettingService } from '../userSetting/userSetting.service';
import { UserSettingResolver } from '../userSetting/userSetting.resolver';
import { Product } from 'src/product/product.model';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting, Product])],
  providers: [
    UserResolver,
    UserSettingResolver,
    UserService,
    UserSettingService,
    ProductService,
  ],
})
export class UserModule {}
