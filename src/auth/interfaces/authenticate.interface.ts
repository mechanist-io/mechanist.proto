export interface IJWTPayload {
  sub: string;
  sessionId: string;
  username?: string;
  refreshCounter: number;
}

export interface IAuthenticationResponse {
  jwtPayload: IJWTPayload;
  // @TODO: update this to the correct type
  user: any;
}
