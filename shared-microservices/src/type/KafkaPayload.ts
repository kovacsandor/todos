import { KafkaTopic } from 'src/type/KafkaTopic';

export type KafkaPayload<T extends KafkaTopic, U> = {
  readonly message: U;
  readonly topic: T;
};
