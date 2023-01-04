import { EachMessagePayload } from 'kafkajs';
import { KafkaPayload, KafkaTopic } from 'src/type';

export const mockKafkaMessage = <T extends KafkaPayload<KafkaTopic, unknown>>(
  payload: T,
): Pick<EachMessagePayload, 'message' | 'partition' | 'topic'> => {
  return {
    message: {
      attributes: 0,
      key: Buffer.from('messageKey'),
      offset: '0',
      size: 0,
      timestamp: new Date().getTime().toString(),
      value: Buffer.from(JSON.stringify(payload.message)),
    },
    partition: 0,
    topic: payload.topic,
  };
};
