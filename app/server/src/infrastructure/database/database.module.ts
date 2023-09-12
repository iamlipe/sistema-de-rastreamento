import { Module } from '@nestjs/common';
import { PrismaService } from '@/infrastructure/database/prisma/prisma.service';
import { RouteRepository } from '@/application/repositories/route.repostory';
import { DriverRepository } from '@/application/repositories/driver.repository';
import { PrismaRouteRepository } from '@/infrastructure/database/prisma/repositories/prisma.route.repository';
import { PrismaDriverRepository } from '@/infrastructure/database/prisma/repositories/prisma.driver.repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: RouteRepository,
      useClass: PrismaRouteRepository,
    },
    {
      provide: DriverRepository,
      useClass: PrismaDriverRepository,
    },
  ],
  exports: [RouteRepository, DriverRepository],
})
export class DatabaseModule {}
