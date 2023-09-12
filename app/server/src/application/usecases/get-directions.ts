import {
  DirectionsResponseData,
  Client as GoogleMapsClient,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Coord } from '@prisma/client';

interface GetDirectionsRequest {
  originId: string;
  destinationId: string;
}

interface GetDirectionsResponse extends DirectionsResponseData {
  request: {
    origin: {
      id: string;
      location?: Coord;
    };
    destination: {
      id: string;
      location?: Coord;
    };
    mode: TravelMode;
  };
}

@Injectable()
export class GetDirectionsUseCase {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}

  async execute({
    originId,
    destinationId,
  }: GetDirectionsRequest): Promise<GetDirectionsResponse> {
    const { data } = await this.googleMapsClient.directions({
      params: {
        origin: `place_id:${originId}`,
        destination: `place_id:${destinationId}`,
        mode: TravelMode.driving,
        key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'),
      },
    });

    const request: GetDirectionsResponse['request'] = {
      origin: {
        id: originId,
        location: {
          lat: data.routes[0].legs[0].start_location.lat,
          long: data.routes[0].legs[0].start_location.lng,
        },
      },
      destination: {
        id: destinationId,
        location: {
          lat: data.routes[0].legs[0].end_location.lat,
          long: data.routes[0].legs[0].end_location.lng,
        },
      },
      mode: TravelMode.driving,
    };

    return { ...data, request };
  }
}
