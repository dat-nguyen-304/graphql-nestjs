import {
  Resolver,
  Query,
  Args,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Product } from './product.model';
import { ProductService } from './product.service';
import { CreateProductInput } from './product.type';
import { User } from 'src/user/user.model';

export let incrementalId = 10;

@Resolver((of) => Product)
export class ProductResolver {
  constructor(private ProductService: ProductService) {}

  @Query((returns) => Product, { nullable: true })
  getProductById(@Args('id', { type: () => Int }) id: number) {
    return this.ProductService.getProductById(id);
  }

  @Query(() => [Product])
  getProducts() {
    return this.ProductService.getProducts();
  }

  @ResolveField((returns) => User, { name: 'user', nullable: true })
  getUser(@Parent() user: User) {
    return this.ProductService.getUserById(user.id);
  }

  @Mutation((returns) => Product)
  createProduct(
    @Args('createProductData') createProductData: CreateProductInput,
  ) {
    return this.ProductService.createProduct(createProductData);
  }
}
