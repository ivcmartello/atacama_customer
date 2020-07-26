/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';
import { Customer } from './customer.entity';

const logger = new Logger('Customer');

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  find(query: FindConditions<Customer>) {
    return this.customerRepository.find(query);
  }

  findOne(query: FindConditions<Customer>) {
    return this.customerRepository.findOne(query);
  }

  createCustomer(customer: any) {
    try {
      const customerEntity = this.customerRepository.create(customer);
      const res = this.customerRepository.insert(customerEntity);

      logger.log('Created');

      return res;
    } catch (error) {
      logger.log(error);
      throw error;
    }
  }
}
