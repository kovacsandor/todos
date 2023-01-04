import { KafkaMessage } from 'kafkajs';
import { KafkaPayload, KafkaTopic } from 'src/type';

export const parseKafkaMessage = <T extends KafkaPayload<KafkaTopic, unknown>>(message: KafkaMessage): T['message'] => {
  return JSON.parse(message.value.toString());
};
