import { json } from 'body-parser';
import express, { Express } from 'express';
import { completeTask, createTask, getCompletedTasks, getMyTasks } from 'src/route';
import { handleError } from 'todos-shared-microservices';

export const app: Express = express();

app.use(json());

// routes
app.use(completeTask);
app.use(createTask);
app.use(getCompletedTasks);
app.use(getMyTasks);

app.use(handleError);
