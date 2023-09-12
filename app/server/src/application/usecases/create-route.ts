import { Injectable } from '@nestjs/common';
import { RouteRepository } from '../repositories/route.repostory';
import { RouteProps } from '../entities/route';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

interface CreateRouteRequest {
  name: string;
  directions: any;
}

@Injectable()
export class CreateRouteUseCase {
  constructor(
    private routeRespository: RouteRepository,
    @InjectQueue('kafka-producer') private kafkaProducerQueue: Queue,
  ) {}

  async execute({ name, directions }: CreateRouteRequest) {
    const route: Omit<RouteProps, 'id'> = {
      name,
      origin: {
        name: directions.routes[0].legs[0].start_address,
        location: {
          lat: directions.routes[0].legs[0].start_location.lat,
          long: directions.routes[0].legs[0].start_location.lng,
        },
      },
      destination: {
        name: directions.routes[0].legs[0].end_address,
        location: {
          lat: directions.routes[0].legs[0].end_location.lat,
          long: directions.routes[0].legs[0].end_location.lng,
        },
      },
      distance: directions.routes[0].legs[0].distance.value,
      duration: directions.routes[0].legs[0].duration.value,
      directions: JSON.stringify({
        available_travel_modes: directions.available_travel_modes,
        geocoded_waypoints: directions.geocoded_waypoints,
        routes: directions.routes,
        request: directions.request,
      }),
    };

    const createdRoute = await this.routeRespository.create(route);

    await this.kafkaProducerQueue.add({
      event: 'RouteCreated',
      id: createdRoute.id,
      name: createdRoute.name,
    });

    return createdRoute;
  }
}
