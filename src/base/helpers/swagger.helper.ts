import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getConfiguration } from '../../config-module/helpers/env-variable-mapper';
import { INestApplication } from '@nestjs/common';

export function swaggerConfiguration(app: INestApplication<any>): void {
  if (getConfiguration().api.enabled) {
    const config = new DocumentBuilder()
      .setTitle(getConfiguration().api.title)
      .setDescription(getConfiguration().api.description)
      .setVersion(getConfiguration().api.version)
      .addServer('/', 'Local or without krakend')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup(getConfiguration().api.path, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });
  }
}
