export interface IQueueProcessOptions {
  name: string;
  concurrency: number;
}

export interface IQueueOptions {
  removeOnComplete: boolean;
  removeOnFail: boolean;
  attempts: number;
}

export interface IQueueIntegration {
  queue: {
    name: string;
    options: IQueueOptions;
    events: Record<string, IQueueProcessOptions>;
  };
}
