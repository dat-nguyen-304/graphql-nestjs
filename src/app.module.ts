import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.model';
import { UserSetting } from './userSetting/userSetting.model';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.model';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: process.env.NODE_ENV === 'TEST' ? 3307 : 3306,
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database:
        process.env.NODE_ENV === 'TEST'
          ? process.env.DB_TEST_NAME
          : process.env.DB_NAME,
      entities: [User, UserSetting, Product],
      synchronize: true,
      // logging: true,
    }),
    UserModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
