import { UpdateUserDto } from './../../dto/update-user.dto';
import { CreateUserDto } from '../../dto/create-user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';

export class UserInMemoryRepository implements UserRepository {
  private database: User[] = [];
  create(data: CreateUserDto): Promise<User> | User {
    const newUser = new User();
    Object.assign(newUser, {
      ...data,
    });
    this.database.push(newUser);

    return newUser;
  }

  // findAll(): User[] | Promise<User[]> {
  //   return this.database;
  // }

  findOne(id: string): User | Promise<User> {
    const user = this.database.find((user) => user.id === id);
    return user;
  }

  delete(id: string): void | Promise<void> {
    const user = this.database.findIndex((user) => user.id === id);
    this.database.splice(user, 1);
  }

  update(id: string, data: UpdateUserDto): User | Promise<User> {
    const user = this.database.findIndex((user) => user.id === id);
    this.database[user] = {
      ...this.database[user],
      ...data,
    };
    return this.database[user];
  }
}
