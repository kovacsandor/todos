import { date, lazy, object, string } from 'yup';

export const createTaskValidationSchema = object().shape({
  description: string().max(4000),
  dueDate: lazy((value: Date) => date().required().min(new Date())),
  summary: string().required().min(3).max(320),
  type: string().required().oneOf(['private', 'work']),
});
