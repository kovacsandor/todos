import { connect } from 'mongoose';
import { app } from 'src/app';
import { checkEnv } from 'todos-shared-microservices';

const port: number = 8081;

app.listen(port, async (): Promise<void> => {
  checkEnv({
    JWT_SECRET: true,
  });

  await connect('mongodb://task-service-database:27017/task-service');

  console.log(`Task service is listening on port ${port}...`);
});
