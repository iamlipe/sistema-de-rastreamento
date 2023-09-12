import { Route as RoutePrisma } from '@prisma/client';
import { Route } from '@/application/entities/route';

export class RouteMapper {
  static toPrisma(route: Route) {
    return {
      _id: route.id,
      name: route.name,
      origin: route.origin,
      destination: route.destination,
      duration: route.duration,
      distance: route.distance,
      directions: route.directions,
      created_at: route.createdAt,
      updated_at: route.updatedAt,
    };
  }

  static prismaToDomain(raw: RoutePrisma) {
    return new Route(raw.id, {
      name: raw.name,
      origin: raw.origin,
      destination: raw.destination,
      duration: raw.duration,
      distance: raw.distance,
      directions: raw.directions,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
  }
}
