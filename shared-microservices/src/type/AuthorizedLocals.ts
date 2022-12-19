import { User } from 'todos-shared';

export interface AuthorizedLocals {
  readonly user: Pick<User, 'id'>;
}
