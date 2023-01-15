import { recurse } from 'cypress-recurse';
import { ParsedMail } from 'mailparser';
import { TestAccount } from 'nodemailer';

Cypress.Commands.add('renderEmail', (testAccount: TestAccount): void => {
  recurse(
    () => cy.task<ParsedMail>('getLastMessage', testAccount),
    (parsedMail: ParsedMail | null) => parsedMail !== null,
    {
      timeout: 60000,
      delay: 5000,
    },
  )
    .its('html')
    .then((html) => {
      cy.document({ log: false }).invoke({ log: false }, 'write', html);
    });
});
