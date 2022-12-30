import { ServerResponseValidation } from 'src/type';

export const getPayload = <T extends Record<string, any>, U extends Record<string, any>>(
  response: ServerResponseValidation<T, U>,
): T | null => {
  return response.type === 'Success' ? response.payload : null;
};
