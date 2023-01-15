import { defineConfig } from 'cypress';
import { ParsedMail } from 'mailparser';
import { createTestAccount, TestAccount } from 'nodemailer';
import { migrate } from 'src/migrate';
import { getLastMessage } from 'src/task';

module.exports = defineConfig({
  e2e: {
    downloadsFolder: './downloads',
    experimentalInteractiveRunEvents: true,
    fixturesFolder: './fixtures',
    retries: 2,
    screenshotsFolder: './screenshots',
    specPattern: './src/e2e/**/*.cy.ts',
    supportFile: './src/support/e2e.ts',
    videosFolder: './videos',

    setupNodeEvents: (on, config) => {
      on('before:spec', async (spec): Promise<void> => await migrate());
      on('task', {
        createTestAccount: async (): Promise<TestAccount> => createTestAccount(),
        getLastMessage: async (testAccount: TestAccount): Promise<ParsedMail | null> => getLastMessage(testAccount),
      });
    },
  },
});
