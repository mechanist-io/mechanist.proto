/* eslint-disable */
import path from 'path';
import { readFileSync } from 'fs';
import { IConfig } from '../interfaces/config.interface';

const title = 'MAMAFI Identity Service';
const description = 'MAMAFI Identity Service API Documentation';

export function getConfiguration(): IConfig {
  const env = process.env;
  return {
    core: {
      env: env.ENV?.length ? env.ENV : 'development',
      port: Number(env.PORT) || 9000,
      host: env.HOST || '127.0.0.1',
      platformUserId: env.PLATFORM_USER_ID!,
    },
    api: {
      version: 'v1',
      globalPrefix: 'api',
      enabled: env.SWAGGER_ENABLED?.length
        ? JSON.parse(env.SWAGGER_ENABLED)
        : true,
      title,
      description,
      path: env.SWAGGER_PATH || `/api`,
    },
    redis: {
      host: env.REDIS_HOST!,
      port: +env.REDIS_PORT!,
      db: +env.REDIS_DB!,
      username: env.REDIS_USERNAME!,
      password: env.REDIS_PASSWORD!,
      maxRetriesPerRequest: 3,
    },
    database: {
      type: env.TYPEORM_TYPE as any,
      host: env.TYPEORM_HOST,
      port: +env.TYPEORM_PORT!,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      database: env.TYPEORM_DATABASE,
      entities: [__dirname + '/../../**/entities/*.entity.{ts,js}'],
      synchronize: env.TYPEORM_SYNC?.toLowerCase() === 'true' ? true : false,
      logging: false,
      extra: {
        idleTimeoutMillis: 30000, // close idle connections after 30 seconds
      },
      ssl:
        env.TYPEORM_SSL_ON === 'true'
          ? {
              ca: readFileSync(
                env.TYPEORM_SSL_CA_PATH || path.join(process.cwd(), 'db.crt'),
              ),
              rejectUnauthorized:
                env.TYPEORM_SSL_REJECT_UNAUTHORIZED === 'true',
            }
          : false,
    },
    twilio: {
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID as string,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN as string,
      TWILIO_SENDER_PHONE_NUMBER: process.env
        .TWILIO_SENDER_PHONE_NUMBER as string,
    },
    auth: {
      JWT_ACCESS_TOKEN_SECRET: env.JWT_ACCESS_TOKEN_SECRET!,
      JWT_ACCESS_TOKEN_EXPIRE_SEC: +env.JWT_ACCESS_TOKEN_EXPIRE_SEC!,
      JWT_REFRESH_TOKEN_SECRET: env.JWT_REFRESH_TOKEN_SECRET!,
      JWT_REFRESH_TOKEN_EXPIRE_SEC: +env.JWT_REFRESH_TOKEN_EXPIRE_SEC!,
      SESSION_HASH_SECRET: env.SESSION_HASH_SECRET!,
      OTP_SECRET: env.OTP_SECRET!,
      OTP_PERIOD_SEC: +env.OTP_PERIOD_SEC!,
      OFFICIAL_BOT_API_KEY: env.OFFICIAL_BOT_API_KEY!,
    },
    vault: {
      VAULT_ADDR: env.VAULT_ADDR!,
      VAULT_NAMESPACE: env.VAULT_NAMESPACE!,
      VAULT_ROLE_ID: env.VAULT_ROLE_ID!,
      VAULT_SECRET_ID: env.VAULT_SECRET_ID!,
      VAULT_API_VERSION: env.VAULT_API_VERSION!,
    },
    wallet: {
      WALLET_ENCRYPT_KEY: env.WALLET_ENCRYPT_KEY!,
    },
    smsProvider: {
      SMS_PROVIDER_URL: env.SMS_PROVIDER_URL || '',
      SMS_PROVIDER_TOKEN: env.SMS_PROVIDER_TOKEN || '',
      smsProviderNumber: env.SMS_PROVIDER_NUMBER,
    },
    fileStorage: {
      S3_BUCKET_ACCESS_KEY_ID: process.env.S3_BUCKET_ACCESS_KEY_ID || '',
      S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || '',
      S3_BUCKET_REGION: process.env.S3_BUCKET_REGION || '',
      S3_BUCKET_SECRET_ACCESS_KEY:
        process.env.S3_BUCKET_SECRET_ACCESS_KEY || '',
      POST_MEDIA_SIZE_LIMIT_MB: +process.env.POST_MEDIA_SIZE_LIMIT_MB!,
    },
    network: {
      ethRpcUrl: process.env.NETWORK_ETH_RPC_URL!,
      tokenManagerUtilsAddress:
        process.env.NETWORK_TOKEN_MANAGER_UTILS_ADDRESS!,
      tokenManagerProxyAddress:
        process.env.NETWORK_TOKEN_MANAGER_PROXY_ADDRESS!,
    },
    validations: {
      post: {
        hashtagContentMaxLength:
          +process.env.VALIDATION_POST_HASHTAG_MAX_CHARACTERS_LIMIT!,
        tokenIdsMaxCount: +process.env.VALIDATION_POST_TOKEN_IDS_MAX_COUNT!,
        contentMaxLength: +process.env.VALIDATION_POST_CONTENT_MAX_LENGTH!,
        hashtagsMaxCount: +process.env.VALIDATION_POST_HASHTAGS_MAX_COUNT!,
        mentionsMaxCount: +process.env.VALIDATION_POST_MENTIONS_MAX_COUNT!,
        mediaIdsMaxCount: +process.env.VALIDATION_POST_MEDIA_IDS_MAX_COUNT!,
        bulkCreateMaxCount: +process.env.VALIDATION_MAX_THREAD_POSTS_COUNT!,
      },
      user: {
        usernameMaxLength: +process.env.VALIDATION_USERS_USERNAME_MAX_LENGTH!,
        usernameMinLength: +process.env.VALIDATION_USERS_USERNAME_MIN_LENGTH!,
        fullNameMaxLength: +process.env.VALIDATION_USERS_FULLNAME_MAX_LENGTH!,
        fullNameMinLength: +process.env.VALIDATION_USERS_FULLNAME_MIN_LENGTH!,
        bioMaxLength: +process.env.VALIDATION_USERS_BIO_MAX_LENGTH!,
        bioMinLength: +process.env.VALIDATION_USERS_BIO_MIN_LENGTH!,
        emailMaxLength: +process.env.VALIDATION_USERS_EMAIL_MAX_LENGTH!,
        emailMinLength: +process.env.VALIDATION_USERS_EMAIL_MIN_LENGTH!,
        pseudonymMaxLength: +process.env.VALIDATION_USERS_PSEUDONYM_MAX_LENGTH!,
        pseudonymMinLength: +process.env.VALIDATION_USERS_PSEUDONYM_MIN_LENGTH!,
        profileUrlsMaxLength:
          +process.env.VALIDATION_USERS_PROFILE_URLS_MAX_LENGTH!,
        profileUrlsMinLength:
          +process.env.VALIDATION_USERS_PROFILE_URLS_MIN_LENGTH!,
        findMaxLimit: +process.env.VALIDATION_USERS_FIND_MAX_LIMIT!,
        findMaxPage: +process.env.VALIDATION_USERS_FIND_MAX_PAGE!,
      },
      engagement: {
        maxEngagementsBulkInsertCount:
          +process.env.VALIDATION_MAX_ENGAGEMENT_BULK_INSERT_COUNT!,
        maxDurationInSec: +process.env.VALIDATION_MAX_DURATION_IN_SEC!,
      },
    },
    recommendation: {
      affinity: {
        followScore: +process.env.RECOMMENDATION_AFFINITY_SCORE_FOLLOW!,
        viewWeight:
          +process.env.RECOMMENDATION_AFFINITY_WEIGHT_POST_ENGAGEMENT_VIEW!,
        likeWeight:
          +process.env.RECOMMENDATION_AFFINITY_WEIGHT_POST_ENGAGEMENT_LIKE!,
        replyWeight:
          +process.env.RECOMMENDATION_AFFINITY_WEIGHT_POST_ENGAGEMENT_REPLY!,
        repostWeight:
          +process.env.RECOMMENDATION_AFFINITY_WEIGHT_POST_ENGAGEMENT_REPOST!,
        postWeight:
          +process.env.RECOMMENDATION_AFFINITY_WEIGHT_POST_ENGAGEMENT_POST!,
        shareWeight:
          +process.env.RECOMMENDATION_AFFINITY_WEIGHT_POST_ENGAGEMENT_SHARE!,
        durationSectorInSec:
          +process.env
            .RECOMMENDATION_AFFINITY_POST_ENGAGEMENT_SECTOR_DURATION_IN_SEC!,

        decayBase: +process.env.RECOMMENDATION_AFFINITY_DECAY_BASE!,
        decayAnchor: +process.env.RECOMMENDATION_AFFINITY_DECAY_ANCHOR!,
        decaySectorInSec:
          +process.env.RECOMMENDATION_AFFINITY_DECAY_SECTOR_IN_SEC!,
      },
      users: {
        suggestedUsersPageSize:
          +process.env.RECOMMENDATION_USERS_SUGGESTED_PAGE_SIZE!,
      },
      feedGeneration: {
        defaultPageSize:
          +process.env.RECOMMENDATION_FEED_GENERATION_DEFAULT_PAGE_SIZE!,
        hashtagAffinityLimit:
          +process.env
            .RECOMMENDATION_FEED_GENERATION_HASHTAG_AFFINITY_PICK_SIZE!,
        userAffinityLimit:
          +process.env.RECOMMENDATION_FEED_GENERATION_USER_AFFINITY_PICK_SIZE!,
        mostPopularPostsPerUserLimit:
          +process.env
            .RECOMMENDATION_FEED_GENERATION_MOST_POPULAR_POSTS_PER_USER_LIMIT!,
        mostPopularPostsPerHashtagLimit:
          +process.env
            .RECOMMENDATION_FEED_GENERATION_MOST_POPULAR_POSTS_PER_HASHTAG_LIMIT!,
        mostRecentPostsPerHashtagLimit:
          +process.env
            .RECOMMENDATION_FEED_GENERATION_MOST_RECENT_POSTS_PER_HASHTAG_LIMIT!,
        trendTimeRangeInSec:
          +process.env.RECOMMENDATION_FEED_GENERATION_TREND_TIME_RANGE_IN_SEC!,
      },
      queue: {
        name: 'queue.feed',
        options: {
          removeOnComplete: true,
          removeOnFail: true,
          attempts: 1,
        },
        events: {
          postDistributionTaskCreated: {
            name: 'event.feed.post-distribution-task.created',
            concurrency: 1,
          },
          postCreated: {
            name: 'event.feed.post.created',
            concurrency: 1,
          },
          postLiked: {
            name: 'event.feed.post.liked',
            concurrency: 1,
          },
          followCreated: {
            name: 'event.feed.follow.created',
            concurrency: 1,
          },
          updateFeed: {
            name: 'event.feed.update',
            concurrency: 1,
          },
        },
      },
    },
  };
}

export function getParam(name: string): string | undefined {
  return process.env[name];
}
