import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DriverRepository } from '@/application/repositories/driver.repository';
import { Coord } from '@prisma/client';

@Injectable()
export class PrismaDriverRepository implements DriverRepository {
  constructor(private prismaService: PrismaService) {}

  async count(routeId: string) {
    return this.prismaService.driver.count({ where: { route_id: routeId } });
  }

  async upsert(routeId: string, location: Coord) {
    return this.prismaService.driver.upsert({
      include: {
        route: true,
      },
      where: {
        route_id: routeId,
      },
      create: {
        route_id: routeId,
        points: {
          set: {
            location: {
              lat: location.lat,
              long: location.long,
            },
          },
        },
      },
      update: {
        points: {
          push: {
            location: {
              lat: location.lat,
              long: location.long,
            },
          },
        },
      },
    });
  }
}
