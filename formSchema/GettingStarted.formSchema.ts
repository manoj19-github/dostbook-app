import * as Z from 'zod';
export const GettingStartedSchema = Z.object({
  mobile: Z.string({invalid_type_error: 'Must be a string'}).refine(
    value => /^(\+\d{1,3}[- ]?)?\d{10}$/gm.test(value ?? ''),
    'invalid phone number',
  ),
});
