import { taskService } from 'src/migrate/taskService';
import { userService } from 'src/migrate/userService';

export const migrate = async (): Promise<void> => {
  const { id } = await userService();
  await taskService(id);
};
