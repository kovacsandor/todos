import axios, { AxiosResponse } from 'axios';
import { createUrl } from 'src/helper';
import { SignUp } from 'todos-shared';

export const signUp = async ({
  email,
  name,
  password,
  passwordConfirmation,
}: SignUp['requestBody']): Promise<SignUp['response']> => {
  const method: SignUp['method'] = 'post';
  const path: SignUp['path'] = '/api/sign-up';
  const url = createUrl(path);
  const { data } = await axios[method]<SignUp['response'], AxiosResponse<SignUp['response']>, SignUp['requestBody']>(
    url,
    {
      email,
      name,
      password,
      passwordConfirmation,
    },
  );

  return data;
};
