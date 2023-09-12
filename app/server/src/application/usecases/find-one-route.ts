import { Injectable } from '@nestjs/common';
import { RouteRepository } from '../repositories/route.repostory';

interface FindOndeRouteRequest {
  id: string;
}

@Injectable()
export class FindOneRouteUseCase {
  constructor(private customerRespository: RouteRepository) {}

  async execute({ id }: FindOndeRouteRequest) {
    return this.customerRespository.findOne(id);
  }
}
