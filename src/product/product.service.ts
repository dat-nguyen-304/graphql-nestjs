import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.model';
import { CreateProductInput } from './product.type';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductRepository: Repository<Product>,
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  getProducts() {
    return this.ProductRepository.find();
  }

  getUserById(id: number) {
    return this.UserRepository.findOne({
      where: { id },
      // relations: ['users'],
    });
  }

  getProductById(id: number) {
    return this.ProductRepository.findOne({
      where: { id },
      // relations: ['users'],
    });
  }

  createProduct(createProductData: CreateProductInput) {
    const newProduct = this.ProductRepository.create(createProductData);
    return this.ProductRepository.save(newProduct);
  }
}
