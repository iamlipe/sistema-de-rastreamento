import { Route } from '@/application/entities/route';

export default class RouteView {
  static toHTTP(route: Route) {
    return {
      id: route.id,
      name: route.name,
      origin: route.origin,
      destination: route.destination,
      distance: route.distance,
      duration: route.duration,
      directions: JSON.parse(route.directions as string),
      created_at: route.createdAt,
      updated_at: route.createdAt,
    };
  }
}

export type RouteViewProps = ReturnType<typeof RouteView.toHTTP>;
