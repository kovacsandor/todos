import moment from 'moment';

describe('tasks', () => {
  it('user can list their tasks', () => {
    cy.signIn();

    cy.findByText(/organize a meeting on monday/i);
  });

  it('user can complete their tasks', () => {
    cy.signIn();

    cy.findByRole('button', { name: /more/i }).click();
    cy.findByRole('menuitem', { name: /complete/i }).click();
    cy.findByRole('button', { name: /completed/i }).click();
    cy.findByText(/organize a meeting on monday/i);
  });

  it('user can list their completed tasks', () => {
    cy.signIn();

    cy.visit('http://todos.local.com/todos/completed');
    cy.findByText(/organize a meeting on tuesday/i);
  });

  it('user can add new tasks', () => {
    const dateString = moment().format('ll');
    const selectedDay = moment().add(1, 'day').date().toString();

    cy.signIn();

    cy.visit('http://todos.local.com/todo/new');
    cy.findByRole('textbox', { name: /summary/i }).type('Organize a meeting on Wednesday');
    cy.findByRole('button', { name: /type/i }).click();
    cy.findByRole('option', { name: /work/i }).click();
    cy.findByRole('button', { name: `Choose date, selected date is ${dateString}` }).click();
    cy.findByRole('gridcell', { name: selectedDay }).click();
    cy.findByRole('button', { name: /create task/i }).click();
    cy.findByText(/no more tasks/i);
    cy.findByText(/organize a meeting on wednesday/i);
  });
});
