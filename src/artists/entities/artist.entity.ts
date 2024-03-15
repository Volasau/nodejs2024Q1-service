import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('artist')
export class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
