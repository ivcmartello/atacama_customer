/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Controller, UseGuards, Get, Post, Body, Logger } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { AuthGuard } from '../guards/AuthGuard';
import { CustomerDto } from './customer.dto';
import { MessagePattern } from '@nestjs/microservices';
import { User } from '../user/user.decorator';
import { FindConditions, In } from 'typeorm';
import { Customer } from './customer.entity';

const logger = new Logger('Customer');

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard)
  @Get()
  find(@User() user: any) {
    return this.customerService.find({
      user_id: user.id,
      cancelled_at: null,
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@User() user: any, @Body() customerDto: CustomerDto) {
    customerDto['user_id'] = user.id;

    return this.customerService.createCustomer(customerDto);
  }

  @MessagePattern({ role: 'customer', cmd: 'get_list' })
  getCustomer(data: any) {
    const { ids, user_id } = data;

    const condition = {
      where: { id: In(ids), user_id, cancelled_at: null },
    } as FindConditions<Customer>;

    try {
      const res = this.customerService.find(condition);

      return res;
    } catch (error) {
      logger.log(error);
      return false;
    }
  }
}
