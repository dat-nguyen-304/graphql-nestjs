import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSetting } from '../userSetting/userSetting.model';
import { User } from '../user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSetting])],
  providers: [],
})
export class UserModule {}
