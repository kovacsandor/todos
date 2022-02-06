import axios from 'axios';
import { ITask } from 'src/component/ITask';

interface IResponseGetTodosMyTasks {
  readonly tasks: readonly Omit<ITask, 'createdOn'>[];
}

export const fetchMyTasks = async (from: number) => {
  const url = `${process.env.REACT_APP_BACKEND_API_URL}/api/todos/my-tasks/${from}`;
  const { data } = await axios.get<IResponseGetTodosMyTasks>(url);

  return data.tasks;
};
