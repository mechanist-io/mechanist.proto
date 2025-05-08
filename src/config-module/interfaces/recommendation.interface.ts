import {
  IQueueOptions,
  IQueueProcessOptions,
  IQueueIntegration,
} from './queue.interface';

export interface IRecommendationConfig extends IQueueIntegration {
  affinity: {
    viewWeight: number;
    durationSectorInSec: number;
    likeWeight: number;
    replyWeight: number;
    postWeight: number;
    repostWeight: number;
    shareWeight: number;
    followScore: number;
    decayBase: number;
    decayAnchor: number;
    decaySectorInSec: number;
  };
  users: {
    suggestedUsersPageSize: number;
  };
  feedGeneration: {
    defaultPageSize: number;
    trendTimeRangeInSec: number;
    userAffinityLimit: number;
    hashtagAffinityLimit: number;
    mostPopularPostsPerHashtagLimit: number;
    mostPopularPostsPerUserLimit: number;
    mostRecentPostsPerHashtagLimit: number;
  };
  queue: {
    name: string;
    options: IQueueOptions;
    events: {
      postDistributionTaskCreated: IQueueProcessOptions;
      postCreated: IQueueProcessOptions;
      postLiked: IQueueProcessOptions;
      updateFeed: IQueueProcessOptions;
      followCreated: IQueueProcessOptions;
    };
  };
}
