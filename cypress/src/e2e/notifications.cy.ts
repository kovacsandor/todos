import { TestAccount } from 'nodemailer';
import { User } from 'todos-shared';

describe('notifications', () => {
  it('user receives notification after signing up', () => {
    cy.task<TestAccount>('createTestAccount').then((testAccount) => {
      const user: Omit<User, 'id'> = {
        email: testAccount.user,
        name: 'Jane Doe',
        password: '0123456789012345',
      };

      cy.signUp(user);

      cy.renderEmail(testAccount);
      cy.findByText(/jane doe/i);
    });
  });
});
