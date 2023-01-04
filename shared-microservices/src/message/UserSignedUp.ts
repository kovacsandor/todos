import { KafkaPayload, KafkaTopic } from 'src/type';
import { User } from 'todos-shared';

export type UserSignedUp = KafkaPayload<KafkaTopic.UserSignedUp, UserSignedUpMessage>;

type UserSignedUpMessage = {
  readonly user: Pick<User, 'email' | 'name'>;
};
