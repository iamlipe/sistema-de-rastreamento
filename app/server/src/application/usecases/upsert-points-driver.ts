import { Injectable } from '@nestjs/common';
import { Coord } from '@prisma/client';
import { DriverRepository } from '../repositories/driver.repository';
import { DirectionsResponseData } from '@googlemaps/google-maps-services-js';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Counter } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

interface GetDirectionsRequest {
  routeId: string;
  location: Coord;
}

@Injectable()
export class UpsertPointsDriverUseCase {
  constructor(
    private driverRepository: DriverRepository,
    @InjectQueue('kafka-producer') private kafkaProducerQueue: Queue,
    @InjectMetric('route_started_counter')
    private routeStartedCounter: Counter,
    @InjectMetric('route_finished_counter')
    private routeFinishedCounter: Counter,
  ) {}

  async execute({ location, routeId }: GetDirectionsRequest): Promise<any> {
    const countPoint = await this.driverRepository.count(routeId);
    const driver = await this.driverRepository.upsert(routeId, location);

    if (countPoint === 0) {
      this.routeStartedCounter.inc();

      await this.kafkaProducerQueue.add({
        event: 'RouteStarted',
        id: driver.route.id,
        name: driver.route.name,
        started_at: new Date().toISOString(),
        lat: location.lat,
        long: location.long,
      });

      return driver;
    }

    const directions: DirectionsResponseData = JSON.parse(
      driver.route.directions as string,
    );

    const lastPoint =
      directions.routes[0].legs[0].steps[
        directions.routes[0].legs[0].steps.length - 1
      ];

    if (
      lastPoint.end_location.lat === location.lat &&
      lastPoint.end_location.lng === location.long
    ) {
      this.routeFinishedCounter.inc();

      await this.kafkaProducerQueue.add({
        event: 'RouteFinished',
        id: driver.route.id,
        name: driver.route.name,
        finished_at: new Date().toISOString(),
        lat: location.lat,
        long: location.long,
      });

      return driver;
    }

    await this.kafkaProducerQueue.add({
      event: 'DriverMoved',
      id: driver.route.id,
      name: driver.route.name,
      lat: location.lat,
      long: location.long,
    });

    return driver;
  }
}
