import { useEffect, useState } from 'react';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';
import { ITask } from 'src/type';

export function useTasks() {
  const [tasks, setTasks] = useState<readonly Omit<ITask, 'createdOn'>[]>([]);
  useEffect(() => {
    const fetch = async () => {
      const tasks = await fetchMyTasks(0);
      setTasks(tasks);
    };

    fetch();
  }, [setTasks]);

  return tasks;
}
