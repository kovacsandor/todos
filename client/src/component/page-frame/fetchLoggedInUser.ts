import axios from 'axios';
import { createUrl } from 'src/helper';
import { GetLoggedInUser, GetLoggedInUserPayload } from 'todos-shared';

export const fetchLoggedInUser = async (): Promise<GetLoggedInUserPayload['loggedInUser']> => {
  const method: GetLoggedInUser['method'] = 'get';
  const path: GetLoggedInUser['path'] = '/api/user-service/logged-in-user';
  const url = createUrl(path);

  const { data } = await axios[method]<GetLoggedInUser['response']>(url);

  if (data.type === 'Success') {
    return data.payload.loggedInUser;
  }

  throw new Error('Invalid case');
};
