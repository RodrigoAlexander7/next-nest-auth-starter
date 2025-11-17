import * as Joi from 'joi';

export const validations = {
  AUTH_GOOGLE_ID: Joi.string().required(),
  AUTH_GOOGLE_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().uri().required(),
  FRONTEND_URL: Joi.string().uri().required(),
  DATABASE_URL: Joi.string().required(),
  AUTH_SECRET: Joi.string().required(),
};
