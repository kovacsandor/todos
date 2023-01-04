import { connect } from 'mongoose';
import { app } from 'src/app';
import { checkEnv } from 'todos-shared-microservices';

const port: number = 8080;

app.listen(port, async (): Promise<void> => {
  checkEnv<typeof process.env>({
    JWT_SECRET: true,
  });

  await connect('mongodb://user-service-database:27017/user-service');

  console.log(`User service is listening on port ${port}...`);
});
