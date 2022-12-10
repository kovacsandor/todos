import { LoginPayload } from 'src/response';
import { Endpoint, ServerResponseValidation, User } from 'src/type';

export type SignUp = Endpoint<'post', Record<string, never>, '/api/sign-up', Request, Response>;

type Request = Pick<User, 'email' | 'name' | 'password'> & {
  readonly passwordConfirmation: string;
};

type Response = ServerResponseValidation<LoginPayload, Request>;
