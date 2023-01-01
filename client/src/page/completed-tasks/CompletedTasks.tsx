import { PageFrame, TaskList } from 'src/component';
import { ProtectedResource } from 'src/component/protected-resource';
import { fetchCompletedTasks } from 'src/page/completed-tasks/fetchCompletedTasks';
import { QueryKey } from 'src/type';

export function CompletedTasks(): JSX.Element {
  return (
    <ProtectedResource>
      <PageFrame title='Completed tasks'>
        <TaskList fetchTasks={fetchCompletedTasks} queryKey={QueryKey.CompletedTasks} />
      </PageFrame>
    </ProtectedResource>
  );
}
