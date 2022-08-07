import { faker } from '@faker-js/faker';
import { User } from 'todos-shared';

export const generateUsers = (): readonly User[] => {
  const count = Math.floor(Math.random() * 10) + 1;
  console.log(`Generating ${count} user${count === 1 ? '' : 's'}...`);
  const result = Array(count)
    .fill(null)
    .map((): User => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();

      return {
        email: faker.internet.email(firstName, lastName, 'todos.com'),
        id: faker.database.mongodbObjectId(),
        name: `${firstName} ${lastName}`,
        password: faker.internet.password(16),
      };
    });
  console.log('[', result[0], result.length ? '... ]' : ']');

  return result;
};
