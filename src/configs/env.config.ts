import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'local')
    .default('development'),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  PLAYGROUND_API_DEV_URL: Joi.string().required(),
  PLAYGROUND_API_PROD_URL: Joi.string().required(),
  PLAYGROUND_API_DEV_JWT_TOKEN: Joi.string().required(),
  PLAYGROUND_API_PROD_JWT_TOKEN: Joi.string().required(),
});
