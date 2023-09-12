import { randomUUID } from 'crypto';
import { Place } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export interface RouteProps {
  id?: string;
  name: string;
  origin: Place;
  destination: Place;
  duration: number;
  distance: number;
  directions: JsonValue;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Route {
  private readonly _id: string;
  private props: Omit<RouteProps, '_id'>;

  constructor(id: string, props: Omit<RouteProps, '_id'>) {
    this._id = id ?? randomUUID();
    this.props = props;
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
  }

  public get id() {
    return this._id;
  }

  public get name() {
    return this.props.name;
  }

  public get origin() {
    return this.props.origin;
  }

  public get destination() {
    return this.props.destination;
  }

  public get duration() {
    return this.props.duration;
  }

  public get distance() {
    return this.props.distance;
  }

  public get directions() {
    return this.props.directions;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
