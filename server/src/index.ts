import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Express } from 'express';
import { handleError } from 'src/middleware';
import { generateTasks, generateUsers } from 'src/mock';
import { createTask, getLoggedInUser, getMyTasks, logIn } from 'src/route';
import { signUp } from 'src/route/signUp';
import { Task, User } from 'todos-shared';

config();

const users: User[] = generateUsers();
const tasks: Task[] = generateTasks(users);

const application: Express = express();
const port: number = Number(process.env.PORT);

application.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
);
application.use(json());

configureRoutes(application);

application.use(handleError);

application.listen(port, (): void => {
  console.log(`Listening at http://localhost:${port}`);
});

function configureRoutes(application: Express): void {
  createTask(application, users, tasks);
  getLoggedInUser(application, users);
  getMyTasks(application, tasks, users);
  logIn(application, users);
  signUp(application, users);
}
