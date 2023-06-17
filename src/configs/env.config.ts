import * as Joi from 'joi';

export interface EnvConfig {
  NODE_ENV: 'development' | 'production' | 'local';
  DB_HOST: string;
  DB_PORT: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  PLAYGROUND_API_URL: string;
  PLAYGROUND_API_URL_JWT_TOKEN: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  BUCKET_NAME: string;
  CREW_API_URL: string;
  OFFICIAL_API_KEY: string;
}

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'local')
    .default('development'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  PLAYGROUND_API_URL: Joi.string().required(),
  PLAYGROUND_API_URL_JWT_TOKEN: Joi.string().required(),
  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  CREW_API_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
  BUCKET_NAME: Joi.string().required(),
  OFFICIAL_API_KEY: Joi.string()
    .required()
    .description('공홈 API를 사용하는 클라이언트에게 제공해주는 KEY 값'),
});
