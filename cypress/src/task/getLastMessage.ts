import { connect, ImapSimpleOptions, Message } from 'imap-simple';
import { ParsedMail, simpleParser } from 'mailparser';
import { TestAccount } from 'nodemailer';

export const getLastMessage = async (testAccount: TestAccount): Promise<ParsedMail | null> => {
  const fetchMessages = async (from: number, to: number): Promise<readonly Message[]> => {
    const imapSimpleOptions: ImapSimpleOptions = {
      imap: {
        user: testAccount.user,
        password: testAccount.pass,
        host: 'imap.ethereal.email',
        port: 993,
        tls: true,
        authTimeout: 10000,
      },
    };

    const imapSimple = await connect(imapSimpleOptions);

    await imapSimple.openBox('INBOX');

    const messages = await imapSimple.search([`${from}:${to}`], { bodies: [''] });

    imapSimple.end();

    return messages;
  };

  try {
    const messages = await fetchMessages(1, 50);

    if (!messages.length) {
      return null;
    }

    const mail = await simpleParser(messages[messages.length - 1].parts[0].body);

    return mail;
  } catch (error) {
    console.error(error);
    return null;
  }
};
