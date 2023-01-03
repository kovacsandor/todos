import { MailDataRequired } from '@sendgrid/mail';

export type Template = Pick<Required<MailDataRequired>, 'html' | 'subject'>;
