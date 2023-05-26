import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserPrismaRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { main_email: email },
    });
    return user;
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, { ...data });

    const newUser = await this.prisma.user.create({
      data: { ...user },
    });

    return plainToInstance(User, newUser);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        contacts: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            main_email: true,
            main_phone: true,
            emails: {
              select: {
                id: true,
                email: true,
              },
            },
            phones: {
              select: {
                id: true,
                phone: true,
              },
            },
          },
        },
        emails: {
          select: {
            id: true,
            email: true,
          },
        },
        phones: {
          select: {
            id: true,
            phone: true,
          },
        },
      },
    });
    return plainToInstance(User, user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return;
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });
    return plainToInstance(User, user);
  }
}
