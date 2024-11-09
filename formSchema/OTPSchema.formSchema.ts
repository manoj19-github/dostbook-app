import * as Z from 'zod';
export const OTPSchemaScreen = Z.object({
  otpVal: Z.string({invalid_type_error: 'Must be a string'}).refine(
    value => /^(\+\d{1,3}[- ]?)?\d{10}$/gm.test(value ?? ''),
    'invalid phone number',
  ),
  email: Z.string({invalid_type_error: 'Must be a string'}).refine(
    value =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gm.test(value ?? ''),
    'invalid email format',
  ),
});
