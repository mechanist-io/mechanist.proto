import { ContentMetadata } from '../types/content-metadata.interface';

export function renderContent(
  content: string,
  metadata: ContentMetadata[],
): string {
  if (!metadata?.length) return content;

  let result = '';
  let lastIndex = 0;

  metadata.forEach(item => {
    // Add text before the entity
    result += content.substring(lastIndex, item.startIndex);

    // Add the entity with proper formatting
    const entityText = content.substring(item.startIndex, item.endIndex);
    if (item.type === 'mention') {
      result += `<a href="/users/${item.id}" class="mention">${entityText}</a>`;
    } else if (item.type === 'hashtag') {
      result += `<a href="/hashtags/${item.value}" class="hashtag">${entityText}</a>`;
    }

    lastIndex = item.endIndex;
  });

  // Add remaining text
  result += content.substring(lastIndex);

  return result;
}

export function extractMentionsAndHashtags(content: any): {
  mentions: string[];
  hashtags: string[];
} {
  if (typeof content == 'string') {
    content = JSON.parse(content);
  }

  return {
    mentions: content.root.children[0].children
      .filter(e => e.type == 'mention')
      ?.map(e => e.mentionId),
    hashtags: content.root.children[0].children
      .filter(e => e.type == 'hashtag')
      ?.map(e => e.text),
  };
}
