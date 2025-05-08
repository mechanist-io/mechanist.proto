import { ClientException } from 'src/base/exceptions/http/client.exception';

export class MediaNotFoundException extends ClientException {
  constructor() {
    super({
      information: {
        message: 'Media not found',
        identifier: 'media.notFound',
      },
    });
  }
}
