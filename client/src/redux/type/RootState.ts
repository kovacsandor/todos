import { User } from 'todos-shared';

export type RootState = {
  readonly authorization: string | null;
  readonly loggedInUser: Pick<User, 'name'> | null;
};
