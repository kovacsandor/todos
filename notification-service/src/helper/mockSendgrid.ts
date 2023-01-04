import { jest } from '@jest/globals';
import { send } from '@sendgrid/mail';

export const mockSendgrid = (mockSendgridSend: jest.Mock<typeof send>) => {
  jest.mock('@sendgrid/mail', () => ({
    send: async (args: Parameters<typeof send>[0]) => mockSendgridSend(args),
  }));
};
