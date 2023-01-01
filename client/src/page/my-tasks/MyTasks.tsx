import { PageFrame, TaskList } from 'src/component';
import { ProtectedResource } from 'src/component/protected-resource';
import { fetchMyTasks } from 'src/page/my-tasks/fetchMyTasks';
import { QueryKey } from 'src/type';

export function MyTasks(): JSX.Element {
  return (
    <ProtectedResource>
      <PageFrame title='My tasks'>
        <TaskList fetchTasks={fetchMyTasks} queryKey={QueryKey.MyTasks} />
      </PageFrame>
    </ProtectedResource>
  );
}
