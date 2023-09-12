import { Driver as DriverPrisma } from '@prisma/client';
import { Driver } from '@/application/entities/driver';

export class DriverMapper {
  static toPrisma(driver: Driver) {
    return {
      _id: driver.id,
      points: driver.points,
      route_id: driver.routeId,
      created_at: driver.createdAt,
      updated_at: driver.updatedAt,
    };
  }

  static prismaToDomain(raw: DriverPrisma) {
    return new Driver(raw.id, {
      points: raw.points,
      routeId: raw.route_id,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }
}
