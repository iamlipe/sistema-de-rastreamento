import { CountDriversUseCase } from '@/application/usecases/count-drivers';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UpsertPointDriverDTO } from '../dto/upsert-point-driver';
import { UpsertPointsDriverUseCase } from '@/application/usecases/upsert-points-driver';

@Controller('driver')
export class DriverController {
  constructor(
    private countDriversUseCase: CountDriversUseCase,
    private upsertPointsDriverUseCase: UpsertPointsDriverUseCase,
  ) {}

  @Get(':id')
  countDriver(@Param('id') routeId: string) {
    return this.countDriversUseCase.execute({ routeId });
  }

  @Patch('id')
  upsertPoints(
    @Param('id') routeId: string,
    @Body() { lat, long }: UpsertPointDriverDTO,
  ): Promise<any> {
    return this.upsertPointsDriverUseCase.execute({
      routeId,
      location: { lat, long },
    });
  }
}
