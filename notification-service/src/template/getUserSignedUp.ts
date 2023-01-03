import { Template } from 'src/type';
import { User } from 'todos-shared';

export const getUserSignedUp = (userName: User['name']): Template => {
  const subject = 'Welcome to Todos';

  return {
    html: `
      <html>
        <body>
          <h1>${subject}</h1>
          <p>Welcome ${userName}, create your first task today!</p>
          <hr />
          Sent by <a href="${process.env.REACT_APP_ORIGIN}" target="_blank">Todos</a>
        </body>
      </html>
    `,
    subject,
  };
};
