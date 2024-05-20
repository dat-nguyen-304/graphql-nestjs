import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './user.type';
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

  getUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  createUser(createUserData: CreateUserInput) {
    const newUser = this.userRepository.create(createUserData);
    return this.userRepository.save(newUser);
  }

  async updateUser(updateUserData: UpdateUserInput) {
    const { userId, ...data } = updateUserData;
    const findUser = await this.userRepository.findOneBy({
      id: userId,
    });

    if (!findUser) throw new Error('User Not Found');
    await this.userRepository.update({ id: userId }, data);
    return this.userRepository.findOneBy({ id: updateUserData.userId });
  }

  async deleteUser(deleteUserData: DeleteUserInput) {
    const findUser = await this.userRepository.findOneBy({
      id: deleteUserData.id,
    });

    if (!findUser) throw new Error('User Not Found');
    const res = await this.userRepository.delete(deleteUserData);
    return res.affected;
  }
}
