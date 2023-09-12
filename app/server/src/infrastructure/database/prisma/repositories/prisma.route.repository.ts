import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RouteRepository } from '@/application/repositories/route.repostory';
import { RouteMapper } from '../../mapper/route.mapper';
import { Route } from '@/application/entities/route';

@Injectable()
export class PrismaRouteRepository implements RouteRepository {
  constructor(private prismaService: PrismaService) {}

  async create(route: Route) {
    const raw = RouteMapper.toPrisma(route);
    const data = await this.prismaService.route.create({
      data: raw,
    });
    return RouteMapper.prismaToDomain(data);
  }

  async findAll() {
    const data = await this.prismaService.route.findMany();
    return data.map(RouteMapper.prismaToDomain);
  }

  async findOne(id: string) {
    const data = await this.prismaService.route.findUniqueOrThrow({
      where: { id },
    });
    return RouteMapper.prismaToDomain(data);
  }
}
