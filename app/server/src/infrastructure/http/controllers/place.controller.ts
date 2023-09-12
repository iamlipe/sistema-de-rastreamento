import { Controller, Get, Query } from '@nestjs/common';
import { FindPlaceUseCase } from '@/application/usecases/find-place';

@Controller('place')
export class PlaceController {
  constructor(private findPlaceUseCase: FindPlaceUseCase) {}

  @Get()
  findPlace(@Query('address') address: string) {
    return this.findPlaceUseCase.execute({ address });
  }
}
