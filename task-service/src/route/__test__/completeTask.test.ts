import { describe, expect, test } from '@jest/globals';
import { Types } from 'mongoose';
import { app } from 'src/app';
import {
  CompleteTask,
  CreateTask,
  getHttpError,
  getPayload,
  getTimeBeforeTomorrow,
  StatusCode,
  Task,
} from 'todos-shared';
import { getJWT, SupertestResponse, testEndpoint } from 'todos-shared-microservices';

describe('completeTask', () => {
  const userId = new Types.ObjectId();

  const requestBody: CreateTask['requestBody'] = {
    description: 'Do not forget to invite Jane Doe',
    dueDate: getTimeBeforeTomorrow().toISOString(),
    summary: 'Organize a meeting for Monday',
    type: 'work',
  };

  const createTask = async (authorization: string): Promise<SupertestResponse<CreateTask['response']>> =>
    testEndpoint<CreateTask>(
      app,
      {
        method: 'post',
        path: '/api/task-service/create',
        requestBody,
      },
      { authorization },
    );

  const completeTask = async (
    authorization: string,
    taskId: Task['id'],
  ): Promise<SupertestResponse<CreateTask['response']>> =>
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

  test('user can complete task', async () => {
    const authorization = getJWT(userId.toString());

    const { body }: SupertestResponse<CreateTask['response']> = await createTask(authorization);
    const { task } = getPayload(body);

    const response: SupertestResponse<CompleteTask['response']> = await completeTask(authorization, task.id);
    const payload = getPayload(response.body);

    expect(response.status).toBe(StatusCode.OK);
    expect(response.body.type).toBe('Success');
    expect(payload.task).toBeDefined();
    expect(payload.task.id).toBeDefined();
    expect(payload.task.createdOn).toBeDefined();
    expect(payload.task.description).toBe(requestBody.description);
    expect(payload.task.dueDate).toBe(requestBody.dueDate);
    expect(payload.task.summary).toBe(requestBody.summary);
    expect(payload.task.type).toBe(requestBody.type);
    expect(payload.task.status).toBe('completed');
    expect(payload.task.owner).toBe(userId.toString());
  });

  test('user cannot complete already completed task', async () => {
    const authorization = getJWT(userId.toString());

    const { body }: SupertestResponse<CreateTask['response']> = await createTask(authorization);
    const { task } = getPayload(body);

    await completeTask(authorization, task.id);

    const response: SupertestResponse<CompleteTask['response']> = await completeTask(authorization, task.id);
    const error = getHttpError(response.body);

    expect(response.status).toBe(StatusCode.UnprocessableEntity);
    expect(response.body.type).toBe('HttpError');
    expect(error.message).toBe('Task is already completed');
  });

  test('user cannot complete foreign task', async () => {
    const authorization = getJWT(userId.toString());

    const { body }: SupertestResponse<CreateTask['response']> = await createTask(authorization);
    const { task } = getPayload(body);

    const response: SupertestResponse<CompleteTask['response']> = await completeTask(
      getJWT(new Types.ObjectId().toString()),
      task.id,
    );

    const error = getHttpError(response.body);

    expect(response.status).toBe(StatusCode.Forbidden);
    expect(response.body.type).toBe('HttpError');
    expect(error.message).toBe('User has no access rights to task');
  });

  test('user cannot non-existent task', async () => {
    const authorization = getJWT(userId.toString());

    await createTask(authorization);

    const response: SupertestResponse<CompleteTask['response']> = await completeTask(
      authorization,
      new Types.ObjectId().toString(),
    );

    const error = getHttpError(response.body);

    expect(response.status).toBe(StatusCode.NotFound);
    expect(response.body.type).toBe('HttpError');
    expect(error.message).toBe('No task found with provided id');
  });
});
