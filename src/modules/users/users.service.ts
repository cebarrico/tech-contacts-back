import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  // async findAll() {
  //   const users = await this.userRepository.findAll();
  //   return users;
  // }

  async findOne(id: string) {
    const findUser = await this.userRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    return findUser;
  }

  async update(id: string, data: UpdateUserDto) {
    const findUser = await this.userRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const user = await this.userRepository.update(id, data);
    return user;
  }

  async remove(id: string) {
    const findUser = await this.userRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('User not found');
    }
    const user = await this.userRepository.delete(id);

    return;
  }
}
