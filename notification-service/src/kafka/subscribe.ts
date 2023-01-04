import { Kafka } from 'kafkajs';
import { eachMessage } from 'src/kafka/eachMessage';
import { subscribeKafka } from 'todos-shared-microservices';
import { KafkaTopic } from 'todos-shared-microservices/dist/type';

export const subscribe = async (): Promise<void> => {
  const client = new Kafka({
    brokers: ['kafka:9092'],
    clientId: 'notification-service-kafka-client',
  });

  return subscribeKafka({
    client,
    eachMessage,
    groupId: 'notification-service-consumer-group',
    topics: [KafkaTopic.UserSignedUp],
  });
};
