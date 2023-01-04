import { client } from 'src/kafka/client';
import { KafkaPayload, KafkaSendMessage, KafkaTopic, sendKafkaMessage } from 'todos-shared-microservices';

export const sendMessage = async <T extends KafkaPayload<KafkaTopic, unknown>>({
  message,
  messageKey,
  topic,
}: Omit<KafkaSendMessage<T>, 'client'>): Promise<void> => {
  await sendKafkaMessage({
    client,
    message,
    messageKey,
    topic,
  });
};
