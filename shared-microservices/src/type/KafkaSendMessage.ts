import { Kafka } from 'kafkajs';
import { KafkaPayload } from 'src/type/KafkaPayload';
import { KafkaTopic } from 'src/type/KafkaTopic';

export type KafkaSendMessage<T extends KafkaPayload<KafkaTopic, unknown>> = {
  readonly client: Kafka;
  readonly messageKey: string;
  readonly message: T['message'];
  readonly topic: T['topic'];
};
