import { EachMessagePayload } from 'kafkajs';
import { sendNotification } from 'src/sendgrid';
import { getUserSignedUp } from 'src/template';
import { parseKafkaMessage, UserSignedUp } from 'todos-shared-microservices';

export const userSignedUp = async ({
  message,
  partition,
  topic,
}: Pick<EachMessagePayload, 'message' | 'partition' | 'topic'>): Promise<void> => {
  const { user } = parseKafkaMessage<UserSignedUp>(message);
  const template = getUserSignedUp(user.name);

  return await sendNotification({
    html: template.html,
    subject: template.subject,
    to: user.email,
  });
};
