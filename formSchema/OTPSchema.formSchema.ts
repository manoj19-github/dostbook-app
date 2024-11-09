import * as Z from 'zod';
export const OTPSchemaScreen = Z.object({
  otp: Z.string({invalid_type_error: 'Must be a string'}).min(
    5,
    'Must be 5 digits',
  ),
  email: Z.string({invalid_type_error: 'Must be a string'}).refine(
    value =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gm.test(value ?? ''),
    'invalid email format',
  ),
});
