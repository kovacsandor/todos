import { json } from 'body-parser';
import express, { Express } from 'express';
import { getLoggedInUser, logIn, signUp } from 'src/route';
import { handleError } from 'todos-shared-microservices';

export const app: Express = express();

app.use(json());

// routes
app.use(getLoggedInUser);
app.use(logIn);
app.use(signUp);

app.use(handleError);
