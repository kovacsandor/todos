import { app } from 'src/app';
import { subscribe } from 'src/kafka';
import { setupSendgrid } from 'src/sendgrid';
import { checkEnv } from 'todos-shared-microservices';

const port: number = 8082;

app.listen(port, async (): Promise<void> => {
  checkEnv<typeof process.env>({
    REACT_APP_ORIGIN: true,
    SENDGRID_API_KEY: true,
    SENDGRID_FROM: true,
  });

  setupSendgrid();

  await subscribe();

  console.log(`Notification service is listening on port ${port}...`);
});
