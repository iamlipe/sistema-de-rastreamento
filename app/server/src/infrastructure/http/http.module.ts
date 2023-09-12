import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/infrastructure/database/database.module';
import { DirectionsController } from '@/infrastructure/http/controllers/direction.controller';
import { PlaceController } from '@/infrastructure/http/controllers/place.controller';
import { RoutesController } from '@/infrastructure/http/controllers/route.controller';
import { DriverController } from '@/infrastructure/http/controllers/driver.controller';
import { CountDriversUseCase } from '@/application/usecases/count-drivers';
import { CreateRouteUseCase } from '@/application/usecases/create-route';
import { FindAllRoutesUseCase } from '@/application/usecases/find-all-routes';
import { FindOneRouteUseCase } from '@/application/usecases/find-one-route';
import { FindPlaceUseCase } from '@/application/usecases/find-place';
import { GetDirectionsUseCase } from '@/application/usecases/get-directions';
import { UpsertPointsDriverUseCase } from '@/application/usecases/upsert-points-driver';
import { RouteGateway } from './gateways/route.gateway';
import { Client as GoogleMapsClient } from '@googlemaps/google-maps-services-js';
import { BullModule } from '@nestjs/bull';
import { NewPointJob } from './jobs/new-point.job';
import { KafkaProducerJob } from './jobs/kafka-producer.job';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    DatabaseModule,
    BullModule.registerQueue({ name: 'new-point' }, { name: 'kafka-producer' }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nest',
            brokers: [process.env.KAFKA_BROKER],
          },
          consumer: {
            groupId: 'nest-consumer',
          },
        },
      },
    ]),
    PrometheusModule.register(),
  ],
  controllers: [
    DirectionsController,
    PlaceController,
    RoutesController,
    DriverController,
  ],
  providers: [
    NewPointJob,
    KafkaProducerJob,
    RouteGateway,
    FindAllRoutesUseCase,
    FindOneRouteUseCase,
    FindPlaceUseCase,
    GetDirectionsUseCase,
    CreateRouteUseCase,
    CountDriversUseCase,
    UpsertPointsDriverUseCase,
    {
      provide: GoogleMapsClient,
      useValue: new GoogleMapsClient(),
    },
    makeCounterProvider({
      name: 'route_started_counter',
      help: 'Number of routes started',
    }),
    makeCounterProvider({
      name: 'route_finished_counter',
      help: 'Number of routes finished',
    }),
  ],
})
export class HttpModule {}
