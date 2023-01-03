import { beforeAll } from '@jest/globals';
import { mockSendgrid, mockSendgridSend } from 'src/helper';
import { EnvironmentVariables } from 'todos-shared-microservices';

mockSendgrid(mockSendgridSend);

beforeAll(async () => {
  const environmentVariables: EnvironmentVariables = {
    REACT_APP_ORIGIN: 'REACT_APP_ORIGIN',
    SENDGRID_API_KEY: 'SENDGRID_API_KEY',
    SENDGRID_FROM: 'SENDGRID_FROM',
  };

  process.env = {
    ...process.env,
    ...environmentVariables,
  };
});
