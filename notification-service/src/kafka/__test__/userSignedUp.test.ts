import { describe, expect, test } from '@jest/globals';
import { mockSendgridSend } from 'src/helper';
import { userSignedUp } from 'src/kafka/userSignedUp';
import { getUserSignedUp } from 'src/template';
import { KafkaTopic, mockKafkaMessage, UserSignedUp } from 'todos-shared-microservices';

describe('userSignedUp', () => {
  test('first', async () => {
    const payload: UserSignedUp = {
      message: {
        user: {
          email: 'john.doe@todos.com',
          name: 'John Doe',
        },
      },
      topic: KafkaTopic.UserSignedUp,
    };

    const message = mockKafkaMessage(payload);

    await userSignedUp(message);

    const template = getUserSignedUp(payload.message.user.name);

    expect(mockSendgridSend).toBeCalledWith({
      from: process.env.SENDGRID_FROM,
      html: template.html,
      subject: template.subject,
      to: payload.message.user.email,
    });
  });
});
