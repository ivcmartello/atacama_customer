/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  Index,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import { CustomerInterface } from './customer.interface';

@Entity('customers')
@Unique(['email'])
export class Customer implements CustomerInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index()
  @Column()
  @IsEmail()
  email: string;

  @Column()
  cellphone: string;

  @Column()
  birthdate: Date;

  @Column({ nullable: true })
  cancelled_at: Date;

  @Column({ nullable: false, select: false })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
