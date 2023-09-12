import { Coord } from '@prisma/client';

export abstract class DriverRepository {
  abstract count(routeId: string): Promise<number>;
  abstract upsert(routeId: string, location: Coord): Promise<any>;
}
