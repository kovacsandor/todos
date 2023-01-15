import { TestAccount } from 'nodemailer';
import { User } from 'todos-shared';

declare global {
  namespace Cypress {
    interface Chainable {
      renderEmail: (testAccount: TestAccount) => void;
      signIn: () => void;
      signUp: (user: Omit<User, 'id'>) => void;
    }
  }
}
