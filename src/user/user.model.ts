import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserSetting } from '../userSetting/userSetting.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from 'src/product/product.model';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;

  @OneToMany(() => Product, (product) => product.user)
  @Field(() => [Product], { defaultValue: [] })
  products: Product[];
}
