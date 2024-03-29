import { describe, expect, test } from '@jest/globals';
import { Types } from 'mongoose';
import { app } from 'src/app';
import { CreateTask, GetMyTasks, getPayload, getTimeBeforeTomorrow, StatusCode } from 'todos-shared';
import { getJWT, SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('getMyTasks', () => {
  const requestJaneDoe: CreateTask['requestBody'] = {
    description: 'Do not forget to invite Jane Doe',
    dueDate: getTimeBeforeTomorrow().toISOString(),
    summary: 'Organize a meeting for Monday',
    type: 'work',
  };

  const createTask = (
    authorization: string,
    requestBody: CreateTask['requestBody'],
  ): Promise<SupertestResponse<CreateTask['response']>> =>
    testEndpoint<CreateTask>(
      app,
      {
        method: 'post',
        path: '/api/task-service/create',
        requestBody,
      },
      { authorization },
    );

  const GetMyTasks = (authorization: string, from: string): Promise<SupertestResponse<GetMyTasks['response']>> =>
    testEndpoint<GetMyTasks>(
      app,
      {
        method: 'get',
        path: '/api/task-service/my-tasks/:from',
        params: {
          from,
        },
      },
      { authorization },
    );

  test('users can get their tasks', async () => {
    const userId = new Types.ObjectId();
    const authorization = getJWT(userId.toString());

    await createTask(authorization, requestJaneDoe);

    const response: SupertestResponse<GetMyTasks['response']> = await GetMyTasks(authorization, '0');
    const payload = getPayload(response.body);
    const [task] = payload.tasks;

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.tasks).toHaveLength(1);
    expect(task).toBeDefined();
    expect(task.description).toBe(requestJaneDoe.description);
    expect(task.dueDate).toBe(requestJaneDoe.dueDate);
    expect(task.id).toBeDefined();
    expect(task.status).toBe('todo');
    expect(task.summary).toBe(requestJaneDoe.summary);
    expect(task.type).toBe(requestJaneDoe.type);
  });

  test('user can load more tasks', async () => {
    const userId = new Types.ObjectId();
    const authorization = getJWT(userId.toString());

    const requestJanetDoe: CreateTask['requestBody'] = {
      description: 'Do not forget to invite Janet Doe',
      dueDate: getTimeBeforeTomorrow().toISOString(),
      summary: 'Organize a meeting for Tuesday',
      type: 'work',
    };

    await createTask(authorization, requestJaneDoe);
    await createTask(authorization, requestJanetDoe);

    const response: SupertestResponse<GetMyTasks['response']> = await GetMyTasks(authorization, '1');
    const payload = getPayload(response.body);
    const [task] = payload.tasks;

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.tasks).toHaveLength(1);
    expect(task).toBeDefined();
    expect(task.summary).toBe(requestJanetDoe.summary);
  });
});
