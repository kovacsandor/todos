import { describe, expect, test } from '@jest/globals';
import { CreateTask } from 'src/endpoint';
import { getError } from 'src/helper';
import { getTimeBeforeTomorrow, validateFields } from 'src/utility';
import { createTaskValidationSchema } from 'src/validation/createTaskValidationSchema';
import { ValidationError } from 'yup';

describe('createTaskValidationSchema', () => {
  test('value gets validated', async () => {
    const value: CreateTask['requestBody'] = {
      description: 'Do not forget to invite Jane Doe',
      dueDate: getTimeBeforeTomorrow().toISOString(),
      summary: 'Organize a meeting for Monday',
      type: 'work',
    };

    const error = await getError<ValidationError>(() => validateFields(value, createTaskValidationSchema));
    expect(error).toBeUndefined();
  });

  test('value gets rejected', async () => {
    const value = {
      dueDate: new Date().toISOString(),
      summary: 'ab',
      type: 'fun',
    };

    const error = await getError<ValidationError>(() => validateFields(value, createTaskValidationSchema));

    expect(error.errors[0].includes('dueDate field must be later than')).toBeTruthy();
    expect(error.errors[1]).toBe('summary must be at least 3 characters');
    expect(error.errors[2]).toBe('type must be one of the following values: private, work');
  });
});
