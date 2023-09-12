import { Point } from '@prisma/client';
import { randomUUID } from 'crypto';

interface DriverProps {
  id?: string;
  routeId: string;
  points: Point[];
  createdAt?: Date;
  updatedAt?: Date;
}

export class Driver {
  private readonly _id: string;
  private props: Omit<DriverProps, 'id'>;

  constructor(id: string, props: Omit<DriverProps, 'id'>) {
    this._id = id ?? randomUUID();
    this.props = props;
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? new Date();
  }

  public get id() {
    return this._id;
  }

  public get routeId() {
    return this.props.routeId;
  }

  public get points() {
    return this.props.points;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.createdAt;
  }
}
