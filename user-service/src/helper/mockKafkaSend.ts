import { jest } from '@jest/globals';
import { Producer } from 'kafkajs';

export const mockKafkaSend: jest.Mock<Producer['send']> = jest.fn();
