import { Route, RouteProps } from '@/application/entities/route';

export abstract class RouteRepository {
  abstract create(route: RouteProps): Promise<Route>;
  abstract findAll(): Promise<Route[]>;
  abstract findOne(id: string): Promise<Route>;
}
