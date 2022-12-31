import { json } from 'body-parser';
import express, { Express } from 'express';
import { createTask, getMyTasks } from 'src/route';
import { completeTask } from 'src/route/completeTask';
import { handleError } from 'todos-shared-microservices';

export const app: Express = express();

app.use(json());

// routes
app.use(completeTask);
app.use(createTask);
app.use(getMyTasks);

app.use(handleError);
