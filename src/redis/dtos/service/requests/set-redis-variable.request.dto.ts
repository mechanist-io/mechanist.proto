export class SetRedisVariableRequestDto {
  key!: string;
  value!: string;
  options?: {
    ttl?: number;
    setIfExists?: boolean;
  };
}
