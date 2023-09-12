import { Controller, Get, Post, Body, Param } from '@nestjs/common';

import { CreateRouteUseCase } from '@/application/usecases/create-route';
import { FindAllRoutesUseCase } from '@/application/usecases/find-all-routes';
import { FindOneRouteUseCase } from '@/application/usecases/find-one-route';
import { GetDirectionsUseCase } from '@/application/usecases/get-directions';
import { CreateRouteDTO } from '../dto/create-route.dto';
import RouteView, {
  RouteViewProps,
} from '@/infrastructure/http/view/route.view';

@Controller('route')
export class RoutesController {
  constructor(
    private createRouteUseCase: CreateRouteUseCase,
    private findAllRoutesUseCase: FindAllRoutesUseCase,
    private findOneRouteUseCase: FindOneRouteUseCase,
    private getDirectionsUseCase: GetDirectionsUseCase,
  ) {}

  @Post()
  async create(
    @Body() { destination_id, origin_id, name }: CreateRouteDTO,
  ): Promise<RouteViewProps> {
    const directions = await this.getDirectionsUseCase.execute({
      originId: origin_id,
      destinationId: destination_id,
    });

    const route = await this.createRouteUseCase.execute({ name, directions });
    return RouteView.toHTTP(route);
  }

  @Get()
  async findAll(): Promise<RouteViewProps[]> {
    const routes = await this.findAllRoutesUseCase.execute();
    return routes.map(RouteView.toHTTP);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RouteViewProps> {
    const route = await this.findOneRouteUseCase.execute({ id });
    return RouteView.toHTTP(route);
  }
}
