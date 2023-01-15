import { User } from 'todos-shared';

Cypress.Commands.add('signUp', (user: Omit<User, 'id'>): void => {
  cy.visit('http://todos.local.com/sign-up');
  cy.findByRole('textbox', { name: /name/i }).type(user.name);
  cy.findByRole('textbox', { name: /email/i }).type(user.email);
  cy.findByPlaceholderText('Password').type(user.password);
  cy.findByPlaceholderText(/password confirmation/i).type(user.password);
  cy.findByRole('button', { name: /sign up/i }).click();
});
