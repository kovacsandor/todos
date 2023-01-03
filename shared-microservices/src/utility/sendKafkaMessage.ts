import { RecordMetadata } from 'kafkajs';
import { KafkaPayload, KafkaSendMessage, KafkaTopic } from 'src/type';

export const sendKafkaMessage = async <T extends KafkaPayload<KafkaTopic, unknown>>({
  client,
  messageKey,
  message,
  topic,
}: KafkaSendMessage<T>): Promise<readonly RecordMetadata[]> => {
  const producer = client.producer({ allowAutoTopicCreation: true });

  await producer.connect();

  const recordMetadata = await producer.send({
    topic,
    messages: [
      {
        key: messageKey,
        value: JSON.stringify(message),
      },
    ],
  });

  await producer.disconnect();

  return recordMetadata;
};
