import mongoose, { Types } from 'mongoose';
import { Task } from 'todos-shared';
import { taskModel } from 'todos-shared-microservices';

export const taskService = async (userId: string): Promise<readonly Task[]> => {
  const tasks: readonly Omit<Task, 'id'>[] = [
    {
      createdOn: new Date(1673035802575),
      description: "Don't forget to invite Jane Doe",
      dueDate: new Date(1673132399000),
      owner: userId,
      status: 'todo',
      summary: 'Organize a meeting on Monday',
      type: 'work',
    },
    {
      createdOn: new Date(1673035802575),
      description: "Don't forget to invite Jane Doe",
      dueDate: new Date(1673132399000),
      owner: userId,
      status: 'completed',
      summary: 'Organize a meeting on Tuesday',
      type: 'work',
    },
  ];

  await mongoose.connect('mongodb://localhost:27081/task-service');

  await mongoose.connection.db.dropDatabase();

  const documents = await Promise.all(
    tasks.map(({ owner, ...rest }) =>
      new taskModel({
        ...rest,

        owner: new Types.ObjectId(owner),
      }).save(),
    ),
  );

  await mongoose.disconnect();

  const json = documents.map((document) => document.toJSON());

  return json;
};
