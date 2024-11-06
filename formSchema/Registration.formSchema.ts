import * as Z from 'zod';
export const RegistrationSchema = Z.object({
  email: Z.string({invalid_type_error: 'Must be a string'}).refine(
    value =>
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gm.test(value ?? ''),
    'invalid email format',
  ),
  name: Z.string({invalid_type_error: 'Must be a string'}).min(3, {
    message: 'Name must be greater than 3 characters',
  }),
});
