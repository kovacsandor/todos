import { describe, expect, test } from '@jest/globals';
import { Types } from 'mongoose';
import { app } from 'src/app';
import { CreateTask, getPayload, getTimeBeforeTomorrow, StatusCode } from 'todos-shared';
import { getJWT, SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('createTask', () => {
  test('user can create task', async () => {
    const userId = new Types.ObjectId();
    const authorization = getJWT(userId.toString());

    const requestBody: CreateTask['requestBody'] = {
      description: 'Do not forget to invite Jane Doe',
      dueDate: getTimeBeforeTomorrow().toISOString(),
      summary: 'Organize a meeting for Monday',
      type: 'work',
    };

    const response: SupertestResponse<CreateTask['response']> = await testEndpoint<CreateTask>(
      app,
      {
        method: 'post',
        path: '/api/task-service/create',
        requestBody,
      },
      { authorization },
    );

    const payload = getPayload(response.body);

    expect(response.status).toBe(StatusCode.Created);
    expect(response.body.type).toBe('Success');
    expect(payload.task).toBeDefined();
    expect(payload.task.id).toBeDefined();
    expect(payload.task.createdOn).toBeDefined();
    expect(payload.task.description).toBe(requestBody.description);
    expect(payload.task.dueDate).toBe(requestBody.dueDate);
    expect(payload.task.summary).toBe(requestBody.summary);
    expect(payload.task.type).toBe(requestBody.type);
    expect(payload.task.status).toBe('todo');
    expect(payload.task.owner).toBe(userId.toString());
  });
});
