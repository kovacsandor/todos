import { EachMessagePayload } from 'kafkajs';
import { userSignedUp } from 'src/kafka/userSignedUp';
import { KafkaTopic } from 'todos-shared-microservices';

export const eachMessage = async ({ message, partition, topic }: EachMessagePayload): Promise<void> => {
  switch (topic) {
    case KafkaTopic.UserSignedUp:
      return await userSignedUp({ message, partition, topic });
    default:
      throw new Error('Invalid case');
  }
};
