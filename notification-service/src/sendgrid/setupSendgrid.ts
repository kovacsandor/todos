import sendgrid from '@sendgrid/mail';

export const setupSendgrid = (): void => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
};
