import { User } from 'todos-shared';

describe('authentication', () => {
  it('user can sign in', () => {
    cy.signIn();
  });

  it('user can sign up', () => {
    const user: Omit<User, 'id'> = {
      email: 'jane.doe@todos.com',
      name: 'Jane Doe',
      password: '0123456789012345',
    };

    cy.signUp(user);
    cy.findByRole('button', { name: /jane doe/i });
  });

  it('user can sign out', () => {
    cy.signIn();

    cy.findByRole('button', { name: /john doe/i }).click();
    cy.findByRole('button', { name: /login/i });
  });
});
