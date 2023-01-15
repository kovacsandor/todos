import mongoose from 'mongoose';
import { User } from 'todos-shared';
import { userModel } from 'todos-shared-microservices';

export const userService = async (): Promise<User> => {
  const user: Omit<User, 'id'> = {
    email: 'john.doe@todos.com',
    name: 'John Doe',
    password: '$2b$10$TeFfmiAjZblB9q0Nj45Kx.hbEKkp0ZJoooSg2GwYKSqq7oL3uIIRq',
  };

  await mongoose.connect('mongodb://localhost:27080/user-service');

  await mongoose.connection.db.dropDatabase();

  const document = userModel.createDocument(user);

  await document.save();

  await mongoose.disconnect();

  const json = document.toJSON();
  return json;
};
