import { json } from 'body-parser';
import express, { Express } from 'express';
import { createTask, getMyTasks } from 'src/route';
import { handleError } from 'todos-shared-microservices';

export const app: Express = express();

app.use(json());

// routes
app.use(createTask);
app.use(getMyTasks);

app.use(handleError);
