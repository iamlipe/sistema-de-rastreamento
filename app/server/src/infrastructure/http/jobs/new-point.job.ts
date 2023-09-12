import { UpsertPointsDriverUseCase } from '@/application/usecases/upsert-points-driver';
import { Process, Processor } from '@nestjs/bull';
import { Coord } from '@prisma/client';
import { Job } from 'bull';

@Processor('new-point')
export class NewPointJob {
  constructor(private upsertPointsDriverUseCase: UpsertPointsDriverUseCase) {}

  @Process()
  async handle(job: Job<{ routeId: string; location: Coord }>) {
    await this.upsertPointsDriverUseCase.execute({ ...job.data });
    return {};
  }
}
