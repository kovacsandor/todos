import { json } from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { Express } from 'express';
import { handleError } from 'src/middleware';
import { generateTasks, generateUsers } from 'src/mock';
import { getLoggedInUser, getMyTasks, logIn } from 'src/route';
import { Task, User } from 'todos-shared';

config();

const users: readonly User[] = generateUsers();
const tasks: readonly Task[] = generateTasks(users);

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
  getMyTasks(application, tasks, users);
  logIn(application, users);
  getLoggedInUser(application, users);
}
