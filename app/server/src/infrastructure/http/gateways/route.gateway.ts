import { InjectQueue } from '@nestjs/bull';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Queue } from 'bull';
import { Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class RouteGateway {
  constructor(@InjectQueue('new-point') private newPointQueue: Queue) {}

  @SubscribeMessage('new-point')
  async handleMessage(
    client: Socket,
    payload: { route_id: string; lat: number; long: number },
  ) {
    client.broadcast.emit('admin-new-point', payload);
    client.broadcast.emit(`new-point/${payload.route_id}`, payload);

    await this.newPointQueue.add({
      routeId: payload.route_id,
      location: { lat: payload.lat, long: payload.long },
    });
  }
}
