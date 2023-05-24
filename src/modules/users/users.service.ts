import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findByEmail(email: string) {
    const user = await this.userRepository.findEmail(email);
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.userRepository.findEmail(
      createUserDto.main_email,
    );
    if (findUser) {
      throw new ConflictException('User already exists');
    }
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

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
