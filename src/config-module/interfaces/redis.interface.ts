export interface IRedisConfig {
  host: string;
  username: string;
  db: number;
  port: number;
  password: string;
  maxRetriesPerRequest: number;
}
