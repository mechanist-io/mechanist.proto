import type { JwtPayload } from 'jsonwebtoken';
export interface JwtPayloadInterface extends JwtPayload {
  sub: string;
  sessionId: string;
  refreshCounter: number;
  username?: string;
}
