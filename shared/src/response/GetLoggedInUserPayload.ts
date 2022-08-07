import { User } from 'src/type';

export type GetLoggedInUserPayload = {
  readonly loggedInUser: Pick<User, 'name'>;
};
