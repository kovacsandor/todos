import { describe, expect, test } from '@jest/globals';
import { Types } from 'mongoose';
import { app } from 'src/app';
import {
  CompleteTask,
  CreateTask,
  GetCompletedTasks,
  getPayload,
  getTimeBeforeTomorrow,
  StatusCode,
} from 'todos-shared';
import { getJWT, SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('getCompletedTasks', () => {
  const requestJaneDoe: CreateTask['requestBody'] = {
    description: 'Do not forget to invite Jane Doe',
    dueDate: getTimeBeforeTomorrow().toISOString(),
    summary: 'Organize a meeting for Monday',
    type: 'work',
  };

  const requestJanetDoe: CreateTask['requestBody'] = {
    description: 'Do not forget to invite Janet Doe',
    dueDate: getTimeBeforeTomorrow().toISOString(),
    summary: 'Organize a meeting for Tuesday',
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

  const completeTask = (authorization: string, taskId: string): Promise<SupertestResponse<CompleteTask['response']>> =>
    testEndpoint<CompleteTask>(
      app,
      {
        method: 'put',
        path: '/api/task-service/complete/:taskId',
        params: {
          taskId,
        },
      },
      { authorization },
    );

  const getCompletedTasks = (
    authorization: string,
    from: string,
  ): Promise<SupertestResponse<GetCompletedTasks['response']>> =>
    testEndpoint<GetCompletedTasks>(
      app,
      {
        method: 'get',
        path: '/api/task-service/completed-tasks/:from',
        params: {
          from,
        },
      },
      { authorization },
    );

  test('users can get their tasks', async () => {
    const userId = new Types.ObjectId();
    const authorization = getJWT(userId.toString());

    const created = await createTask(authorization, requestJaneDoe);
    const createdId = getPayload(created.body).task.id;

    await completeTask(authorization, createdId);

    const response: SupertestResponse<GetCompletedTasks['response']> = await getCompletedTasks(authorization, '0');
    const payload = getPayload(response.body);
    const [task] = payload.tasks;

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.tasks).toHaveLength(1);
    expect(task).toBeDefined();
    expect(task.description).toBe(requestJaneDoe.description);
    expect(task.dueDate).toBe(requestJaneDoe.dueDate);
    expect(task.id).toBeDefined();
    expect(task.status).toBe('completed');
    expect(task.summary).toBe(requestJaneDoe.summary);
    expect(task.type).toBe(requestJaneDoe.type);
  });

  test('user can load more tasks', async () => {
    const userId = new Types.ObjectId();
    const authorization = getJWT(userId.toString());

    const createdJane = await createTask(authorization, requestJaneDoe);
    const createdJaneId = getPayload(createdJane.body).task.id;
    const createdJanet = await createTask(authorization, requestJanetDoe);
    const createdJanetId = getPayload(createdJanet.body).task.id;

    await completeTask(authorization, createdJaneId);
    await completeTask(authorization, createdJanetId);

    const response: SupertestResponse<GetCompletedTasks['response']> = await getCompletedTasks(authorization, '1');
    const payload = getPayload(response.body);
    const [task] = payload.tasks;

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.tasks).toHaveLength(1);
    expect(task).toBeDefined();
    expect(task.summary).toBe(requestJanetDoe.summary);
  });
});
