import { describe, expect, test } from '@jest/globals';
import { Types } from 'mongoose';
import { app } from 'src/app';
import { CreateTask, GetMyTasks, getPayload, getTimeBeforeTomorrow, StatusCode } from 'todos-shared';
import { getJWT, SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('getMyTasks', () => {
  test('users can get their tasks', async () => {
    const userId = new Types.ObjectId();
    const authorization = getJWT(userId.toString());

    const requestBody: CreateTask['requestBody'] = {
      description: 'Do not forget to invite Jane Doe',
      dueDate: getTimeBeforeTomorrow().toISOString(),
      summary: 'Organize a meeting for Monday',
      type: 'work',
    };

    await testEndpoint<CreateTask>(
      app,
      {
        method: 'post',
        path: '/api/task-service/create',
        requestBody,
      },
      { authorization },
    );

    const response: SupertestResponse<GetMyTasks['response']> = await testEndpoint<GetMyTasks>(
      app,
      {
        method: 'get',
        path: '/api/task-service/my-tasks/:from',
        params: {
          from: '0',
        },
      },
      { authorization },
    );

    const payload = getPayload(response.body);
    const [task] = payload.tasks;

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.tasks).toHaveLength(1);
    expect(task).toBeDefined();
    expect(task.description).toBe(requestBody.description);
    expect(task.dueDate).toBe(requestBody.dueDate);
    expect(task.id).toBeDefined();
    expect(task.status).toBe('todo');
    expect(task.summary).toBe(requestBody.summary);
    expect(task.type).toBe(requestBody.type);
  });

  test('user can load more tasks', async () => {
    const userId = new Types.ObjectId();
    const authorization = getJWT(userId.toString());

    const [request1, request2]: readonly CreateTask['requestBody'][] = [
      {
        description: 'Do not forget to invite Jane Doe',
        dueDate: getTimeBeforeTomorrow().toISOString(),
        summary: 'Organize a meeting for Monday',
        type: 'work',
      },
      {
        description: 'Do not forget to invite Janet Doe',
        dueDate: getTimeBeforeTomorrow().toISOString(),
        summary: 'Organize a meeting for Tuesday',
        type: 'work',
      },
    ];

    await testEndpoint<CreateTask>(
      app,
      {
        method: 'post',
        path: '/api/task-service/create',
        requestBody: request1,
      },
      { authorization },
    );

    await testEndpoint<CreateTask>(
      app,
      {
        method: 'post',
        path: '/api/task-service/create',
        requestBody: request2,
      },
      { authorization },
    );

    const response: SupertestResponse<GetMyTasks['response']> = await testEndpoint<GetMyTasks>(
      app,
      {
        method: 'get',
        path: '/api/task-service/my-tasks/:from',
        params: {
          from: '1',
        },
      },
      { authorization },
    );

    const payload = getPayload(response.body);
    const [task] = payload.tasks;

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.tasks).toHaveLength(1);
    expect(task).toBeDefined();
    expect(task.summary).toBe(request2.summary);
  });
});
