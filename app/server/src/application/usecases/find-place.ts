import { ConfigService } from '@nestjs/config';
import { Client, PlaceInputType } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';

interface FindPlaceRequest {
  address: string;
}

@Injectable()
export class FindPlaceUseCase {
  constructor(
    private googleMapsClient: Client,
    private configService: ConfigService,
  ) {}

  async execute({ address }: FindPlaceRequest) {
    const { data } = await this.googleMapsClient.findPlaceFromText({
      params: {
        input: address,
        inputtype: PlaceInputType.textQuery,
        fields: ['place_id', 'formatted_address', 'geometry', 'name'],
        key: this.configService.get<string>('GOOGLE_MAPS_API_KEY'),
      },
    });

    return data;
  }
}
