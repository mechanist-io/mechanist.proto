import * as DOMPurify from 'isomorphic-dompurify';

export interface SanitizeOptions {
  allowedTags?: string[];
  allowedAttributes?: { [key: string]: string[] };
  allowedMentions?: boolean;
  allowedHashtags?: boolean;
}

const defaultOptions: SanitizeOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'br'],
  allowedAttributes: {
    a: ['href', 'class'],
  },
  allowedMentions: true,
  allowedHashtags: true,
};

export function sanitizeContent(
  content: string,
  options: SanitizeOptions = defaultOptions,
): string {
  // Temporarily replace mentions and hashtags with placeholders
  const mentions: string[] = [];
  const hashtags: string[] = [];
  let processedContent = content;

  if (options.allowedMentions) {
    processedContent = processedContent.replace(/@(\w+)/g, match => {
      mentions.push(match);
      return `___MENTION_${mentions.length - 1}___`;
    });
  }

  if (options.allowedHashtags) {
    processedContent = processedContent.replace(/#(\w+)/g, match => {
      hashtags.push(match);
      return `___HASHTAG_${hashtags.length - 1}___`;
    });
  }

  // Sanitize the content
  const sanitized = DOMPurify.sanitize(processedContent, {
    ALLOWED_TAGS: options.allowedTags,
    ALLOWED_ATTR: Object.entries(options.allowedAttributes || {}).reduce(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (acc, [, attrs]) => [...acc, ...attrs],
      [] as string[],
    ),
  });

  // Restore mentions and hashtags
  let finalContent = sanitized;
  mentions.forEach((mention, index) => {
    finalContent = finalContent.replace(`___MENTION_${index}___`, mention);
  });
  hashtags.forEach((hashtag, index) => {
    finalContent = finalContent.replace(`___HASHTAG_${index}___`, hashtag);
  });

  // Remove any excessive whitespace
  finalContent = finalContent.replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');

  return finalContent;
}
