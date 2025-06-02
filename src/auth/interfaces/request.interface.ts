import type { Request } from 'express';
import type { JwtPayloadInterface } from './jwt-payload.interface';

export interface IRequest extends Request {
  token?: string;
  user?: JwtPayloadInterface;
}
