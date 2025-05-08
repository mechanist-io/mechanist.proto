export class IValidationConfig {
  post: {
    contentMaxLength: number;
    hashtagsMaxCount: number;
    mentionsMaxCount: number;
    mediaIdsMaxCount: number;
    tokenIdsMaxCount: number;
    bulkCreateMaxCount: number;
    hashtagContentMaxLength: number;
  };
  user: {
    usernameMaxLength: number;
    usernameMinLength: number;
    fullNameMaxLength: number;
    fullNameMinLength: number;
    bioMaxLength: number;
    bioMinLength: number;
    emailMaxLength: number;
    emailMinLength: number;
    pseudonymMaxLength: number;
    pseudonymMinLength: number;
    profileUrlsMaxLength: number;
    profileUrlsMinLength: number;
    findMaxLimit: number;
    findMaxPage: number;
  };
  engagement: {
    maxDurationInSec: number;
    maxEngagementsBulkInsertCount: number;
  };
}
