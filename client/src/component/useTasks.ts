import { useEffect, useState } from 'react';
import { fetchMyTasks } from 'src/component/fetchMyTasks';
import { ITask } from 'src/component/ITask';

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
