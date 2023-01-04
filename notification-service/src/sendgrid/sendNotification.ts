import sendgrid, { MailDataRequired } from '@sendgrid/mail';

export const sendNotification = async (
  message: Omit<MailDataRequired, 'from' | 'text'> & Pick<Required<MailDataRequired>, 'html'>,
): Promise<void> => {
  try {
    await sendgrid.send({ ...message, from: process.env.SENDGRID_FROM });
    console.log(`Notification sent to ${message.to} with subject '${message.subject}'`);
  } catch (error) {
    console.log(`Failed to sent notification to ${message.to} with subject '${message.subject}'`);
    throw error;
  }
};
