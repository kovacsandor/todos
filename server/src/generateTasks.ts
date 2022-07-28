import { faker } from '@faker-js/faker';
import { ITask } from './ITask';

export const generateTasks = () => {
  const count = Math.floor(Math.random() * 100);
  console.log(`Generating ${count} todo${count === 1 ? '' : 's'}...`);
  return Array(count)
    .fill(null)
    .map((): ITask => {
      const now = Date.now();
      const year = 1 * 365 * 24 * 60 * 60 * 1000;
      const dueDateFrom = new Date(now - year).toString();
      const dueDateTo = new Date(now + year).toString();
      const dueDate = faker.date.between(dueDateFrom, dueDateTo).getTime();
      const createdOnFrom = new Date(dueDate - year).toString();
      const createdOn = faker.date.between(createdOnFrom, dueDate.toString()).getTime();

      return {
        createdOn,
        dueDate,
        id: faker.database.mongodbObjectId(),
        status: Math.random() > 0.5 ? 'completed' : 'todo',
        summary: faker.hacker.phrase().replace(/!/i, ''),
        type: Math.random() > 0.5 ? 'private' : 'work',
      };
    })
    .sort((a: ITask, b: ITask) => a.createdOn - b.createdOn);
};
