import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { IsString, IsUUID, IsInt, IsDate } from 'class-validator';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  login: string;

  @Exclude()
  @Column()
  @IsString()
  password: string;

  @VersionColumn()
  @IsInt()
  version: number;

  @Transform(({ value }) => UserEntity.convertDate(value))
  @CreateDateColumn()
  @IsDate()
  createdAt: Date;

  @Transform(({ value }) => UserEntity.convertDate(value))
  @UpdateDateColumn()
  @IsDate()
  updatedAt: Date;

  static convertDate(value: Date): number {
    return new Date(value).getTime();
  }
}
