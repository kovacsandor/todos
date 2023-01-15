Cypress.Commands.add('signIn', (): void => {
  cy.visit('http://todos.local.com/login');
  cy.findByRole('textbox', { name: /email/i }).type('john.doe@todos.com');
  cy.findByPlaceholderText(/password/i).type('0123456789012345');
  cy.findByRole('button', { name: /login/i }).click();
  cy.findByRole('button', { name: /john doe/i });
});
