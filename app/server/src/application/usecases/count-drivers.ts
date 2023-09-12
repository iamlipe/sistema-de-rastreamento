import { Injectable } from '@nestjs/common';
import { DriverRepository } from '../repositories/driver.repository';

interface CountDriversRequest {
  routeId;
}

@Injectable()
export class CountDriversUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute({ routeId }: CountDriversRequest) {
    return this.driverRepository.count(routeId);
  }
}
