import { Jest } from '@jest/environment';
import { Producer, ProducerRecord } from 'kafkajs';

export const mockKafka = (jest: Jest) => (mockKafkaSend: jest.Mock<Producer['send']>) => {
  jest.mock('kafkajs', () => ({
    Kafka: jest.fn(() => ({
      producer: jest.fn(() => ({
        connect: jest.fn(),
        disconnect: jest.fn(),
        send: (producerRecord: ProducerRecord) => mockKafkaSend(producerRecord),
      })),
    })),
  }));
};
