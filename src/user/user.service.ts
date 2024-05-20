import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { CreateUserInput } from './user.type';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find();
  }

  getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      // relations: ['settings'],
    });
  }

  createUser(createUserData: CreateUserInput) {
    const newUser = this.userRepository.create(createUserData);
    return this.userRepository.save(newUser);
  }
}
