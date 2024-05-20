import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.model';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { User } from 'src/user/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User, Product])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}
