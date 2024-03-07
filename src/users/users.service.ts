import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { data } from 'src/data/data';
import { v4 as uuidv4 } from 'uuid';
import { validate } from 'uuid';

@Injectable()
export class UsersService {
  create(userDto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      login: userDto.login,
      password: userDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    data.users.push(user);
    const result = { ...user };
    delete result.password;
    return result;
  }

  findAll() {
    return data.users;
  }

  findOne(id: string) {
    if (!validate(id)) throw new BadRequestException('invalid id (not uuid)');
    const user = data.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('Not found user');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
