import { Kafka } from 'kafkajs';

export const client = new Kafka({
  brokers: ['kafka:9092'],
  clientId: 'user-service-kafka-client',
});
