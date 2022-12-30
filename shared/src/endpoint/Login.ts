import { LoginPayload } from 'src/response';
import { Endpoint, ServerResponseValidation, User } from 'src/type';

export type Login = Endpoint<'post', Record<string, never>, '/api/user-service/login', Request, Response>;

type Request = Pick<User, 'email' | 'password'>;
type Response = ServerResponseValidation<LoginPayload, Request>;
