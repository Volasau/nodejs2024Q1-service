import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validate } from 'uuid';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  public async findOne(id: string): Promise<User> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('Not found user');
    }

    return user;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    if (!userDto.login || !userDto.password)
      throw new BadRequestException(
        'You forgot to fill in your username or password',
      );
    if (
      typeof userDto.login !== 'string' ||
      typeof userDto.password !== 'string'
    ) {
      throw new BadRequestException('Login or password not string');
    }
    const newUser = {
      ...userDto,
      version: 1,
    };
    const resultUser = this.userRepository.create(newUser);
    await this.userRepository.save(resultUser);
    return new User(resultUser);
  }

  async update(id: string, updateUserDto: UpdatePasswordDto): Promise<User> {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');

    if (
      !(updateUserDto.oldPassword && updateUserDto.newPassword) ||
      typeof updateUserDto.oldPassword !== 'string' ||
      typeof updateUserDto.newPassword !== 'string'
    ) {
      throw new BadRequestException('oldPassword or newPassword not string');
    }
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) throw new NotFoundException('User not found');

    if (updateUserDto.oldPassword !== user.password) {
      throw new ForbiddenException('Password does not  match');
    }
    const newVersion = user.version + 1;
    const newUserData = {
      ...user,
      password: updateUserDto.newPassword,
      updatedAt: Date.now(),
      version: newVersion,
    };
    await this.userRepository.save(newUserData);
    const newUser = await this.userRepository.findOne({ where: { id } });
    return new User(newUser);
  }

  async remove(id: string) {
    if (!validate(id)) throw new BadRequestException('Invalid id (not uuid)');
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    await this.userRepository.delete(id);
    return;
  }
}
