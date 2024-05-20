import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/user.model';

@Entity({ name: 'products' })
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column('float')
  @Field((type) => Float)
  price: number;

  @Column()
  @Field(() => Int)
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn()
  @Field(() => User, { nullable: true })
  user: User;
}
