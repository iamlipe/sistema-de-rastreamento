import { GetDirectionsUseCase } from '@/application/usecases/get-directions';
import { DirectionsResponseData } from '@googlemaps/google-maps-services-js';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('direction')
export class DirectionsController {
  constructor(private getDirectionsUseCase: GetDirectionsUseCase) {}

  @Get()
  getDirections(
    @Query('origin_id') originId: string,
    @Query('destination_id') destinationId: string,
  ): Promise<DirectionsResponseData & { request: unknown }> {
    return this.getDirectionsUseCase.execute({
      originId,
      destinationId,
    });
  }
}
