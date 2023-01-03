import { jest } from '@jest/globals';
import { send } from '@sendgrid/mail';

export const mockSendgridSend = jest.fn<typeof send>();
