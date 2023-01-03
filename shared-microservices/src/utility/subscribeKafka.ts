import { EachMessageHandler, Kafka } from 'kafkajs';
import { KafkaTopic } from 'src/type';

export type SubscribeKafkaArgs = {
  readonly client: Kafka;
  readonly eachMessage: EachMessageHandler;
  readonly groupId: string;
  readonly topics: KafkaTopic[];
};

export const subscribeKafka = async ({ client, eachMessage, groupId, topics }: SubscribeKafkaArgs) => {
  const admin = client.admin();

  await admin.createTopics({ topics: topics.map((topic) => ({ topic })) });

  const consumer = client.consumer({ allowAutoTopicCreation: true, groupId });

  await consumer.connect();
  await Promise.all(topics.map((topic) => consumer.subscribe({ topic, fromBeginning: true })));
  await consumer.run({ eachMessage });
};
