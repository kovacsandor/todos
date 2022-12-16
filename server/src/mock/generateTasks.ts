import { faker } from '@faker-js/faker';
import { Task, User } from 'todos-shared';

export const generateTasks = (users: readonly User[]): Task[] => {
  const count = Math.floor(Math.random() * 100);
  console.log(`Generating ${count} todo${count === 1 ? '' : 's'}...`);
  return Array(count)
    .fill(null)
    .map((): Task => {
      const now = Date.now();
      const year = 1 * 365 * 24 * 60 * 60 * 1000;
      const dueDateFrom = new Date(now - year).toString();
      const dueDateTo = new Date(now + year).toString();
      const dueDate = faker.date.between(dueDateFrom, dueDateTo).getTime();
      const createdOnFrom = new Date(dueDate - year).toString();
      const createdOn = faker.date.between(createdOnFrom, dueDate.toString()).getTime();

      return {
        createdOn,
        description: faker.lorem.paragraphs(),
        dueDate,
        id: faker.database.mongodbObjectId(),
        owner: users[Math.floor(Math.random() * users.length)].id,
        status: Math.random() > 0.5 ? 'completed' : 'todo',
        summary: faker.hacker.phrase().replace(/!/i, ''),
        type: Math.random() > 0.5 ? 'private' : 'work',
      };
    })
    .sort((a: Task, b: Task) => a.createdOn - b.createdOn);
};
