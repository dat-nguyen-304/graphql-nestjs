import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserSettingResolver } from './userSetting/userSetting.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';
import { UserSetting } from './userSetting/userSetting.model';
import { UserModule } from './user/user.module';
import { UserSettingService } from './userSetting/userSetting.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: 'password',
      database: 'database',
      entities: [User, UserSetting],
      synchronize: true,
      // logging: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
