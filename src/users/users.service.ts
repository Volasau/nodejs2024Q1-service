import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from '../helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOneId(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const newUser: UserEntity = this.usersRepository.create(userDto);

    return await this.usersRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new ForbiddenException('Password does not  match');
    }

    user.password = updateUserDto.newPassword;
    return await this.usersRepository.save(user);
  }

  async removeUser(id: string): Promise<void> {
    const user: UserEntity = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.remove(user);
  }
}
