import { Injectable } from '@nestjs/common';
import { RouteRepository } from '../repositories/route.repostory';

@Injectable()
export class FindAllRoutesUseCase {
  constructor(private customerRespository: RouteRepository) {}

  async execute() {
    return this.customerRespository.findAll();
  }
}
