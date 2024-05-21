import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.model';
import { CreateProductInput } from './product.type';
import { Repository } from 'typeorm';
import { User } from '../user/user.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getProducts() {
    return this.productRepository.find();
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      // relations: ['users'],
    });
  }

  getProductById(id: number) {
    return this.productRepository.findOne({
      where: { id },
      // relations: ['users'],
    });
  }

  async createProduct(createProductData: CreateProductInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createProductData.userId,
    });

    if (!findUser) throw new Error('User Not Found');
    const newProduct = this.productRepository.create(createProductData);
    return this.productRepository.save(newProduct);
  }

  getProductsByUserId(userId: number) {
    return this.productRepository.findBy({ userId });
  }
}
