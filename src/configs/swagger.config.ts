import { DocumentBuilder } from '@nestjs/swagger';

export const appVersion = '1.0';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('SOPT Official API Docs')
  .setDescription('The SOPT official page API description')
  .setVersion(appVersion)
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })
  .build();
